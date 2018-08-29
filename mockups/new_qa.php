<?php require 'partials/head.html'; ?>

<body>
  <?php require 'partials/header.html' ?>

  <div class="container">
    <form autocomplete="off">
      <div class="row">
        <div class="form-group col-md-3">
          <label for="date">Call date</label>
          <input type="date" class="form-control" id="date">
        </div>
        <div class="col-md-3">
          <label for="tic">Tech-in-charge</label>
          <select class="form-control tic" name="tic" id="tic" placeholder="Tech-in-charge">
            <option></option>
            <option value="987">Dan Bruce</option>
            <option value="923">John Jacangelo</option>
          </select>
        </div>
        <div class="col-md-2">
          <label for="900number">Tech-in-charge</label>
          <select class="form-control 900number" name="900number" id="900number" placeholder="900 number">
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
