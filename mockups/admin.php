<?php require 'partials/head.html'; ?>

<body>
  <?php require 'partials/header.html' ?>

  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h2>Administration</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <h4>Member management</h4>
      </div>
      <div class="offset-sm-1 col-sm-10 admin-members">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">900 number</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Permissions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">923</th>
              <td>John</td>
              <td>Jacangelo</td>
              <td>
                <div class="btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> None
                  </label>
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> QA
                  </label>
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> Admin
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">930</th>
              <td>Logan</td>
              <td>Ramos</td>
              <td>
                <div class="btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> None
                  </label>
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> QA
                  </label>
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> Admin
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">987</th>
              <td>Dan</td>
              <td>Bruce</td>
              <td>
                <div class="btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> None
                  </label>
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> QA
                  </label>
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> Admin
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td></td>
              <td></td>
              <td><button class="btn btn-outline-danger" name="button">Save permissions</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <h4>Add/edit QA questions</h4>
      </div>
      <div class="col-sm-12 admin-questions">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col" id="questionheader">Question</th>
              <th scope="col">Allow N/A?</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="number" name="q1order" value="1"></td>
              <td>Was the dispatch to en route time less than six (6) minutes and dispatch to on-scene time less than 10 minutes?</td>
              <td>
                <div class="btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> Yes
                  </label>
                </div>
              </td>
              <td>
                <button type="button" class="btn btn-secondary" name="button">Edit text</button>
                <button type="button" class="btn btn-secondary" name="button">Delete</button>
              </td>
            </tr>
            <tr>
              <td><input type="number" name="q2order" value="2"></td>
              <td>If EtOH+, EDP, or AMS patient, was glucometry performed?</td>
              <td>
                <div class="btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> Yes
                  </label>
                </div>
              </td>
              <td>
                <button type="button" class="btn btn-secondary" name="button">Edit text</button>
                <button type="button" class="btn btn-secondary" name="button">Delete</button>
              </td>
            </tr>
            <tr>
              <td><input type="number" name="q3order" value="3"></td>
              <td>Was the chief complaint explicitly recorded?</td>
              <td>
                <div class="btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-secondary">
                    <input type="checkbox" checked autocomplete="off"> Yes
                  </label>
                </div>
              </td>
              <td>
                <button type="button" class="btn btn-secondary" name="button">Edit text</button>
                <button type="button" class="btn btn-secondary" name="button">Delete</button>
              </td>
            </tr>
            <tr>
              <td><button class="btn btn-outline-danger" name="button">Save order</button></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <?php require 'partials/footer.html' ?>
  <?php require 'partials/js.html' ?>
</body>
</html>
