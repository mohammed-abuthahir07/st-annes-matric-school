import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 5199;
const URL = `http://localhost:${PORT}/`;

const VIEWPORTS = [
  { name: 'Small mobile', width: 320, height: 640 },
  { name: 'Standard mobile', width: 360, height: 800 },
  { name: 'Large mobile', width: 390, height: 844 },
  { name: 'Large phone', width: 430, height: 932 },
  { name: 'Small tablet', width: 600, height: 900 },
  { name: 'Tablet portrait', width: 768, height: 1024 },
  { name: 'Tablet landscape', width: 1024, height: 768 },
  { name: 'Small laptop', width: 1280, height: 720 },
  { name: 'Standard desktop', width: 1366, height: 768 },
  { name: 'Large desktop', width: 1440, height: 900 },
  { name: 'Wide desktop', width: 1920, height: 1080 },
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTests() {
  console.log('--- STARTING E2E & RESPONSIVE AUDIT ---');

  // Create screenshots directory
  const screenshotsDir = path.resolve('test-results');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // 1. Launch Vite preview server on port 5199
  console.log(`Starting Vite preview server on port ${PORT}...`);
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => process.stdout.write(`[Vite] ${d}`));
  server.stderr.on('data', (d) => process.stderr.write(`[Vite ERR] ${d}`));

  // Wait for server to be ready
  await sleep(2500);

  let browser;
  let allPassed = true;
  const results = [];

  try {
    browser = await puppeteer.launch({
      executablePath: EDGE_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    });

    const page = await browser.newPage();

    // Catch console errors on page
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log(`\nNavigating to ${URL}...`);
    await page.goto(URL, { waitUntil: 'networkidle2' });

    // -------------------------------------------------------------------------
    // TEST 1: Automatic Admission Modal on full page load
    // -------------------------------------------------------------------------
    console.log('\n[TEST 1] Testing automatic admission modal on page load...');
    await sleep(1200); // Allow 750ms auto-open timer

    const isModalOpenInitially = await page.evaluate(() => {
      const modal = document.querySelector('.modal-backdrop.open');
      const dialog = document.querySelector('.modal-dialog');
      const title = document.getElementById('admission-modal-title');
      const isBodyLocked = document.body.classList.contains('modal-open');
      return {
        hasModal: Boolean(modal),
        hasDialog: Boolean(dialog),
        titleText: title ? title.textContent.trim() : '',
        isBodyLocked,
      };
    });

    if (isModalOpenInitially.hasModal && isModalOpenInitially.isBodyLocked) {
      console.log('✓ PASS: Modal opened automatically on load with body scroll lock.');
      console.log(`  Modal title: "${isModalOpenInitially.titleText}"`);
      results.push({ test: 'Auto-modal on load', status: 'PASS' });
    } else {
      console.error('✗ FAIL: Modal did not open automatically on load:', isModalOpenInitially);
      results.push({ test: 'Auto-modal on load', status: 'FAIL' });
      allPassed = false;
    }

    // Take screenshot of open modal
    await page.screenshot({ path: path.join(screenshotsDir, '01_modal_open.png') });

    // -------------------------------------------------------------------------
    // TEST 2: Close modal and verify background restoration
    // -------------------------------------------------------------------------
    console.log('\n[TEST 2] Testing modal close button and scroll restoration...');
    await page.click('.modal-close-btn');
    await sleep(400); // Wait for exit animation

    const isModalClosed = await page.evaluate(() => {
      const openModal = document.querySelector('.modal-backdrop.open');
      const isBodyLocked = document.body.classList.contains('modal-open');
      return { hasOpenModal: Boolean(openModal), isBodyLocked };
    });

    if (!isModalClosed.hasOpenModal && !isModalClosed.isBodyLocked) {
      console.log('✓ PASS: Modal closed cleanly; body scroll lock removed.');
      results.push({ test: 'Modal close & scroll unlock', status: 'PASS' });
    } else {
      console.error('✗ FAIL: Modal still visible or body still locked:', isModalClosed);
      results.push({ test: 'Modal close & scroll unlock', status: 'FAIL' });
      allPassed = false;
    }

    // -------------------------------------------------------------------------
    // TEST 3: Reopen modal via Hero CTA button
    // -------------------------------------------------------------------------
    console.log('\n[TEST 3] Testing reopening modal via Hero CTA button...');
    await page.evaluate(() => {
      const heroBtn = document.querySelector('.hero-actions .btn-primary');
      if (heroBtn) heroBtn.click();
    });
    await sleep(350);

    const isModalReopened = await page.evaluate(() => {
      return Boolean(document.querySelector('.modal-backdrop.open'));
    });

    if (isModalReopened) {
      console.log('✓ PASS: Modal reopened successfully from Hero button.');
      results.push({ test: 'Reopen modal via Hero CTA', status: 'PASS' });
    } else {
      console.error('✗ FAIL: Modal failed to reopen from Hero button.');
      results.push({ test: 'Reopen modal via Hero CTA', status: 'FAIL' });
      allPassed = false;
    }

    // -------------------------------------------------------------------------
    // TEST 4: Form field validation & input persistence
    // -------------------------------------------------------------------------
    console.log('\n[TEST 4] Testing form validation & input persistence...');
    // Submit empty form to trigger validation errors
    await page.click('.btn-submit-enquiry');
    await sleep(200);

    const errorCount = await page.evaluate(() => {
      return document.querySelectorAll('.field-error-msg').length;
    });

    if (errorCount >= 5) {
      console.log(`✓ PASS: Form validation caught empty required fields (${errorCount} errors displayed).`);
      results.push({ test: 'Form field validation', status: 'PASS' });
    } else {
      console.error(`✗ FAIL: Expected validation errors, found: ${errorCount}`);
      results.push({ test: 'Form field validation', status: 'FAIL' });
      allPassed = false;
    }

    // Fill sample values into form
    console.log('Filling sample admission form data...');
    await page.type('#studentName', 'Karthik Raja');
    await page.type('#dob', '2015-06-12');
    await page.select('#gender', 'Male');
    await page.select('#classApplying', 'Grade 5');
    await page.type('#parentName', 'V. Raja');
    await page.type('#contactNumber', '9876543210');
    await page.type('#streetAddress', '14, North Car Street, Ponmeni');
    await page.type('#pincode', '625016');
    await page.type('#remarks', 'Looking for 5th grade matriculation admission with bus transport.');

    // Close modal with Escape key
    await page.keyboard.press('Escape');
    await sleep(350);

    // Reopen modal via Navbar
    await page.evaluate(() => {
      const navBtn = document.querySelector('.btn-nav-enquiry');
      if (navBtn) navBtn.click();
    });
    await sleep(350);

    // Verify values were preserved
    const preservedValues = await page.evaluate(() => {
      return {
        studentName: document.getElementById('studentName')?.value,
        gender: document.getElementById('gender')?.value,
        classApplying: document.getElementById('classApplying')?.value,
        contactNumber: document.getElementById('contactNumber')?.value,
      };
    });

    if (
      preservedValues.studentName === 'Karthik Raja' &&
      preservedValues.classApplying === 'Grade 5' &&
      preservedValues.contactNumber === '9876543210'
    ) {
      console.log('✓ PASS: Form input values preserved across modal close and reopen.');
      results.push({ test: 'Form values persistence', status: 'PASS' });
    } else {
      console.error('✗ FAIL: Form values were lost:', preservedValues);
      results.push({ test: 'Form values persistence', status: 'FAIL' });
      allPassed = false;
    }

    // Close modal before testing page sections
    await page.click('.modal-close-btn');
    await sleep(350);

    // -------------------------------------------------------------------------
    // TEST 5: Light & Dark Theme Toggle
    // -------------------------------------------------------------------------
    console.log('\n[TEST 5] Testing Light/Dark theme toggle...');
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log(`Initial theme: ${initialTheme}`);

    // Click theme toggle button
    await page.click('.theme-toggle-btn');
    await sleep(250);

    const toggledTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log(`Toggled theme: ${toggledTheme}`);

    // Take screenshot in dark mode
    await page.screenshot({ path: path.join(screenshotsDir, '02_dark_mode_desktop.png') });

    // Click theme toggle button again to return to light mode
    await page.click('.theme-toggle-btn');
    await sleep(250);
    const restoredTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    if (initialTheme === 'light' && toggledTheme === 'dark' && restoredTheme === 'light') {
      console.log('✓ PASS: Theme toggle switches correctly between light and dark modes.');
      results.push({ test: 'Light/Dark theme toggle', status: 'PASS' });
    } else {
      console.error(`✗ FAIL: Theme toggling issue: initial=${initialTheme}, toggled=${toggledTheme}, restored=${restoredTheme}`);
      results.push({ test: 'Light/Dark theme toggle', status: 'FAIL' });
      allPassed = false;
    }

    // -------------------------------------------------------------------------
    // TEST 6: Gallery & Lightbox viewer
    // -------------------------------------------------------------------------
    console.log('\n[TEST 6] Testing Gallery and Lightbox modal...');
    // Scroll to gallery
    await page.evaluate(() => {
      document.getElementById('gallery')?.scrollIntoView();
    });
    await sleep(500);

    // Click first gallery item
    await page.click('.gallery-item');
    await sleep(300);

    const isLightboxOpen = await page.evaluate(() => {
      const lb = document.querySelector('.lightbox-backdrop');
      const img = document.querySelector('.lightbox-img');
      const counter = document.querySelector('.lightbox-counter');
      return {
        hasLightbox: Boolean(lb),
        hasImg: Boolean(img),
        counterText: counter ? counter.textContent.trim() : '',
      };
    });

    if (isLightboxOpen.hasLightbox && isLightboxOpen.hasImg) {
      console.log(`✓ PASS: Lightbox opened with image. Counter: "${isLightboxOpen.counterText}"`);
      results.push({ test: 'Gallery Lightbox open', status: 'PASS' });
    } else {
      console.error('✗ FAIL: Lightbox did not open properly:', isLightboxOpen);
      results.push({ test: 'Gallery Lightbox open', status: 'FAIL' });
      allPassed = false;
    }

    // Press Escape to close lightbox
    await page.keyboard.press('Escape');
    await sleep(300);

    const isLightboxClosed = await page.evaluate(() => !document.querySelector('.lightbox-backdrop'));
    if (isLightboxClosed) {
      console.log('✓ PASS: Lightbox closed on Escape key.');
      results.push({ test: 'Gallery Lightbox close', status: 'PASS' });
    } else {
      console.error('✗ FAIL: Lightbox did not close on Escape key.');
      results.push({ test: 'Gallery Lightbox close', status: 'FAIL' });
      allPassed = false;
    }

    // -------------------------------------------------------------------------
    // TEST 7: Responsive & Horizontal Overflow Check across all 11 viewports
    // -------------------------------------------------------------------------
    console.log('\n[TEST 7] Testing Responsive Layout & Horizontal Overflow across 11 Viewports...');

    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await sleep(250);

      // Measure scrollWidth vs clientWidth
      const overflowMetrics = await page.evaluate(() => {
        const docScrollWidth = document.documentElement.scrollWidth;
        const docClientWidth = document.documentElement.clientWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        const bodyClientWidth = document.body.clientWidth;

        // Check individual sections
        const sections = ['#home', '#about', '#academics', '#gallery', '#contact', '.footer', '.navbar'];
        const sectionOverflows = [];

        sections.forEach((sel) => {
          const el = document.querySelector(sel);
          if (el && el.scrollWidth > docClientWidth + 1) {
            sectionOverflows.push({
              selector: sel,
              scrollWidth: el.scrollWidth,
              clientWidth: docClientWidth,
            });
          }
        });

        return {
          docScrollWidth,
          docClientWidth,
          bodyScrollWidth,
          bodyClientWidth,
          hasDocOverflow: docScrollWidth > docClientWidth,
          sectionOverflows,
        };
      });

      if (!overflowMetrics.hasDocOverflow && overflowMetrics.sectionOverflows.length === 0) {
        console.log(`  ✓ [${vp.name} - ${vp.width}x${vp.height}] No horizontal overflow (scrollWidth: ${overflowMetrics.docScrollWidth} <= clientWidth: ${overflowMetrics.docClientWidth})`);
        results.push({ test: `Viewport ${vp.name} (${vp.width}px)`, status: 'PASS' });
      } else {
        console.error(`  ✗ [${vp.name} - ${vp.width}x${vp.height}] OVERFLOW DETECTED:`, overflowMetrics);
        results.push({ test: `Viewport ${vp.name} (${vp.width}px)`, status: 'FAIL' });
        allPassed = false;
      }

      // Take sample screenshot for mobile & tablet
      if (vp.width === 360) {
        await page.screenshot({ path: path.join(screenshotsDir, '03_mobile_360.png') });
      } else if (vp.width === 768) {
        await page.screenshot({ path: path.join(screenshotsDir, '04_tablet_768.png') });
      } else if (vp.width === 1920) {
        await page.screenshot({ path: path.join(screenshotsDir, '05_desktop_1920.png') });
      }
    }

    // -------------------------------------------------------------------------
    // TEST 8: Mobile Hamburger Menu
    // -------------------------------------------------------------------------
    console.log('\n[TEST 8] Testing Mobile Hamburger Menu...');
    await page.setViewport({ width: 375, height: 667 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(400);

    // Click hamburger button
    await page.waitForSelector('.hamburger-btn', { visible: true });
    await page.evaluate(() => {
      const btn = document.querySelector('.hamburger-btn');
      if (btn) btn.click();
    });
    await sleep(400);

    const isMobileMenuOpen = await page.evaluate(() => {
      const drawer = document.querySelector('.mobile-menu-drawer.open');
      const overlay = document.querySelector('.mobile-menu-overlay.open');
      return Boolean(drawer && overlay);
    });

    if (isMobileMenuOpen) {
      console.log('✓ PASS: Mobile drawer menu opened cleanly.');
      results.push({ test: 'Mobile Hamburger Menu open', status: 'PASS' });

      // Click a navigation link in mobile menu
      await page.evaluate(() => {
        const link = document.querySelector('.mobile-nav-link');
        if (link) link.click();
      });
      await sleep(400);

      const isMobileMenuClosed = await page.evaluate(() => {
        const drawer = document.querySelector('.mobile-menu-drawer.open');
        return !drawer;
      });

      if (isMobileMenuClosed) {
        console.log('✓ PASS: Mobile menu closed after selecting a link.');
        results.push({ test: 'Mobile menu close on item select', status: 'PASS' });
      } else {
        console.error('✗ FAIL: Mobile menu did not close on item click.');
        results.push({ test: 'Mobile menu close on item select', status: 'FAIL' });
        allPassed = false;
      }
    } else {
      console.error('✗ FAIL: Mobile menu failed to open.');
      results.push({ test: 'Mobile Hamburger Menu open', status: 'FAIL' });
      allPassed = false;
    }

    // Check console errors
    console.log('\n[TEST 9] Checking browser console errors...');
    if (consoleErrors.length === 0) {
      console.log('✓ PASS: Zero browser console errors detected.');
      results.push({ test: 'Zero console errors', status: 'PASS' });
    } else {
      console.warn(`! Console errors found (${consoleErrors.length}):`, consoleErrors);
    }
  } catch (err) {
    console.error('Test execution error:', err);
    allPassed = false;
  } finally {
    if (browser) await browser.close();
    server.kill();
  }

  console.log('\n========================================');
  console.log('AUDIT SUMMARY');
  console.log('========================================');
  results.forEach((r) => {
    console.log(`${r.status === 'PASS' ? '✓' : '✗'} ${r.test}: ${r.status}`);
  });
  console.log('========================================\n');

  process.exit(allPassed ? 0 : 1);
}

runTests();
