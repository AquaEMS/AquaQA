<?php require 'partials/head.html'; ?>

<body>
  <?php require 'partials/header.html' ?>

  <div class="container">
    <form autocomplete="off">
      <h4>Call information</h4>
      <div class="row">
        <div class="form-group col-md-3">
          <label for="date">Call date</label>
          <input type="date" class="form-control" id="date">
        </div>
        <div class="col-md-2">
          <label for="prid">PRID</label>
          <input type="text" pattern="^[0-9]{8}$" class="form-control" id="prid" title="A PRID must be exactly 8 numbers long.">
        </div>
        <div class="col-md-4">
          <label for="presenting_problem">Presenting problem</label>
          <input type="text" name="presenting_problem" class="form-control" id="presenting_problem" placeholder="Presenting problem">
        </div>
        <div class="col-md-3">
          <label>&nbsp;</label><br>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="determinantA" autocomplete="off" checked> A
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="determinantB" autocomplete="off"> B
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="determinantC" autocomplete="off"> C
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="determinantD" autocomplete="off"> D
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="determinantE" autocomplete="off"> E
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="determinantFI" autocomplete="off"> F/I
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="determinantS" autocomplete="off"> S
            </label>
          </div>
        </div>
      </div>
      <hr>
        <h4>Personnel</h4>
        <div class="row">
        <div class="col-md-4">
          <label for="tic">Tech-in-charge</label>
          <select class="form-control tic" name="tic" id="tic" placeholder="Tech-in-charge">
            <option></option>
            <option value="987">Dan Bruce</option>
            <option value="923">John Jacangelo</option>
          </select>
        </div>
        <div class="col-md-2">
          <label for="900number">900 number</label>
          <select class="form-control 900number" name="900number" id="900number" placeholder="900 number">
            <option></option>
            <option value="Dan Bruce">987</option>
            <option value="John Jacangelo">923</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="preceptor">Preceptor</label>
          <select class="form-control preceptor" name="preceptor" id="preceptor" placeholder="Preceptor">
            <option></option>
            <option value="987">Dan Bruce</option>
            <option value="923">John Jacangelo</option>
          </select>
        </div>
        <div class="col-md-2">
          <label for="preceptor900number">900 number</label>
          <select class="form-control preceptor900number" name="preceptor900number" id="preceptor900number" placeholder="900 number">
            <option></option>
            <option value="Dan Bruce">987</option>
            <option value="John Jacangelo">923</option>
          </select>
        </div>
      </div>
    </form>
  </div>

  <?php require 'partials/js.html' ?>

</body>
