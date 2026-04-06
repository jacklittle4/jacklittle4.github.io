---
layout: default
title: Magnetic Field Explorer
permalink: /field/
---

<section class="page-hero">
  <p class="eyebrow">Electromagnetism</p>
  <h1>Magnetic Field Explorer</h1>
  <p class="page-intro">
    Visualize the magnetic field around a long straight current-carrying wire and explore the right-hand rule through a cleaner interactive page.
  </p>
</section>

<section class="content-grid field-layout">
  <aside class="card field-controls">
    <h2>Controls</h2>

    <div class="control-group">
      <label for="currentSlider">Current strength <span id="currentValue">1.0</span></label>
      <input type="range" id="currentSlider" min="0.2" max="3" step="0.1" value="1.0" />
    </div>

    <div class="control-group">
      <label for="densitySlider">Vector density <span id="densityValue">18</span></label>
      <input type="range" id="densitySlider" min="10" max="28" step="1" value="18" />
    </div>

    <div class="control-group">
      <label for="scaleSlider">Arrow length <span id="scaleValue">1.0</span></label>
      <input type="range" id="scaleSlider" min="0.4" max="2" step="0.1" value="1.0" />
    </div>

    <div class="control-group">
      <p class="control-label">Current direction</p>
      <div class="toggle-row">
        <button id="outBtn" class="btn is-active" type="button">Out of page</button>
        <button id="intoBtn" class="btn" type="button">Into page</button>
      </div>
    </div>

    <div class="control-group">
      <p class="control-label">Display</p>
      <div class="toggle-row">
        <button id="vectorsBtn" class="btn is-active" type="button">Vectors</button>
        <button id="linesBtn" class="btn is-active" type="button">Field lines</button>
      </div>
    </div>

    <p class="small-note">The wire sits at the center. Use the right-hand rule to compare the direction of circulation.</p>
  </aside>

  <div class="field-main">
    <section class="card canvas-card">
      <canvas id="fieldCanvas" width="960" height="660"></canvas>
    </section>

    <section class="card info-card">
      <h2>About the field</h2>
      <p>
        Around a long straight wire, the magnetic field circulates in concentric loops. Reversing the current reverses the sense of circulation.
      </p>
      <div class="equation-box">
        <p><strong>|B| ∝ I / r</strong></p>
        <p>Thumb = current direction, curled fingers = field direction.</p>
      </div>
      <p>
        This visualization is qualitative rather than strictly to scale. It is designed to show the geometry of the field and how strength falls with distance.
      </p>
    </section>
  </div>
</section>

<script src="{{ '/js/field.js' | relative_url }}"></script>
