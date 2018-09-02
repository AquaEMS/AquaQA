<?php require 'partials/head.html'; ?>

<body>
  <?php require 'partials/header.html' ?>

  <form autocomplete="off" novalidate>
    <div class="container">
      <h4>Call information</h4>
      <div class="row">
        <div class="form-group col-md-3">
          <label for="date">Call date</label>
          <input type="date" class="form-control" id="date" data-validation="required">
        </div>
        <div class="form-group col-md-2">
          <label for="prid">PRID</label>
          <input type="text" class="form-control" id="prid" placeholder="PRID" data-validation="length" data-validation-length="8" data-validation-error-msg="PRID must be exactly 8 numbers long.">
        </div>
        <div class="form-group col-md-4">
          <label for="presenting_problem">Presenting problem</label>
          <input type="text" name="presenting_problem" class="form-control" id="presenting_problem" placeholder="Presenting problem" data-validation="required">
        </div>
        <div class="form-group col-md-3 text-center">
          <label>&nbsp;</label>
          <div class="btn-group btn-group-toggle" data-toggle="buttons" id="determinants">
            <label class="btn btn-secondary">
              <input type="radio" name="determinant" id="determinantA" value="A" autocomplete="off" required> A
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="determinant" id="determinantB" value="B" autocomplete="off"> B
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="determinant" id="determinantC" value="C" autocomplete="off"> C
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="determinant" id="determinantD" value="D" autocomplete="off"> D
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="determinant" id="determinantE" value="E" autocomplete="off"> E
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="determinant" id="determinantFI" value="FI" autocomplete="off"> F/I
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="determinant" id="determinantS" value="S" autocomplete="off"> S
            </label>
          </div>
        </div>
      </div>
      <hr>
      <h4>Personnel</h4>
      <div class="row">
        <div class="form-group col-md-3">
          <label for="tic">Tech-in-charge</label>
          <select class="form-control tic" name="tic" id="tic" placeholder="Tech-in-charge" data-validation="required">
            <option></option>
            <option value="987">Dan Bruce</option>
            <option value="923">John Jacangelo</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="900number">900 number</label>
          <select class="form-control 900number" name="900number" id="900number" placeholder="900 number" data-validation="required">
            <option></option>
            <option value="Dan Bruce">987</option>
            <option value="John Jacangelo">923</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <label for="preceptor">Preceptor</label>
          <select class="form-control preceptor" name="preceptor" id="preceptor" placeholder="Preceptor">
            <option></option>
            <option value="987">Dan Bruce</option>
            <option value="923">John Jacangelo</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="preceptor900number">900 number</label>
          <select class="form-control preceptor900number" name="preceptor900number" id="preceptor900number" placeholder="900 number">
            <option></option>
            <option value="Dan Bruce">987</option>
            <option value="John Jacangelo">923</option>
          </select>
        </div>
        <div class="col-md-2 no-preceptor text-center">
          <label>&nbsp;</label>
          <button type="button" class="btn btn-secondary" id="no_preceptor" disabled>No preceptor</button>
        </div>
      </div>
      <hr>
      <h4>Affirmative questions</h4>
      <div class="row affirmative">
        <div class="col-md-12">
          <div class="row question">
            <div class="question-number offset-sm-1 col-sm-1 col-1">
              1.
            </div>
            <div class="col-sm-6 col-7 question-text">
              <div class="form-check form-check-inline">
                <label class="form-check-label">Was the dispatch to en route time less than six (6) minutes and dispatch to on-scene time less than 10 minutes?</label>
              </div>
            </div>
            <div class="col-sm-2 col-4 question-answer">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="Y1" autocomplete="off"> Y
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="N1" autocomplete="off"> N
                </label>
              </div>
            </div>
          </div>
          <div class="row question">
            <div class="question-number offset-sm-1 col-sm-1 col-1">
              2.
            </div>
            <div class="col-sm-6 col-7 question-text">
              <div class="form-check form-check-inline">
                <label class="form-check-label">Was the chief complaint explicitly recorded?</label>
              </div>
            </div>
            <div class="col-sm-2 col-4 question-answer">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="Y2" autocomplete="off"> Y
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="N2" autocomplete="off"> N
                </label>
              </div>
            </div>
          </div>
          <div class="row question">
            <div class="question-number offset-sm-1 col-sm-1 col-1">
              3.
            </div>
            <div class="col-sm-6 col-7 question-text">
              <div class="form-check form-check-inline">
                <label class="form-check-label">If EtOH+, EDP, or AMS patient, was glucometry performed?</label>
              </div>
            </div>
            <div class="col-sm-2 col-4 question-answer">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="Y3" autocomplete="off"> Y
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="N3" autocomplete="off"> N
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="NA3" autocomplete="off"> N/A
                </label>
              </div>
            </div>
          </div>
          <div class="row question">
            <div class="question-number offset-sm-1 col-sm-1 col-1">
              4.
            </div>
            <div class="col-sm-6 col-7 question-text">
              <div class="form-check form-check-inline">
                <label class="form-check-label">Was the disposition appropriate?</label>
              </div>
            </div>
            <div class="col-sm-2 col-4 question-answer">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="Y4" autocomplete="off"> Y
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="N4" autocomplete="off"> N
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4>Negative questions</h4>
      <div class="row negative">
        <div class="col-md-12">
          <div class="row question">
            <div class="question-number offset-sm-1 col-sm-1 col-1">
              5.
            </div>
            <div class="col-sm-6 col-7 question-text">
              <div class="form-check form-check-inline">
                <label class="form-check-label">Were there any exposures?</label>
              </div>
            </div>
            <div class="col-sm-2 col-4 question-answer">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="Y5" autocomplete="off"> Y
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="N5" autocomplete="off"> N
                </label>
              </div>
            </div>
          </div>
          <div class="row question">
            <div class="question-number offset-sm-1 col-sm-1 col-1">
              6.
            </div>
            <div class="col-sm-6 col-7 question-text">
              <div class="form-check form-check-inline">
                <label class="form-check-label">Was a REMO MD contacted?</label>
              </div>
            </div>
            <div class="col-sm-2 col-4 question-answer">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="Y6" autocomplete="off"> Y
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="N6" autocomplete="off"> N
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4>REMO specialty QI</h4>
      <div class="row remo-specialty">
        <div class="col-md-12">
          <div class="row question">
            <div class="question-number offset-sm-1 col-sm-1 col-1">
              7.
            </div>
            <div class="col-sm-6 col-7 question-text">
              <div class="form-check form-check-inline">
                <label class="form-check-label">Was naloxone, albuterol, or epinephrine	administered?</label>
              </div>
            </div>
            <div class="col-sm-2 col-4 question-answer">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="Y7" autocomplete="off"> Y
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="N7" autocomplete="off"> N
                </label>
              </div>
            </div>
          </div>
          <div class="row question">
            <div class="question-number offset-sm-1 col-sm-1 col-1">
              8.
            </div>
            <div class="col-sm-6 col-7 question-text">
              <div class="form-check form-check-inline">
                <label class="form-check-label">Was a patella reduction performed or public defibrillation used?</label>
              </div>
            </div>
            <div class="col-sm-2 col-4 question-answer">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="Y8" autocomplete="off"> Y
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="N8" autocomplete="off"> N
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <h4>Review</h4>
      <div class="row review">
        <div class="col-md-7 form-group">
          <label for="comments">Comments</label>
          <textarea class="form-control" id="comments" rows="2"></textarea>
        </div>
        <div class="col col-md-3 text-center">
          <div class="row">
            <div class="col-sm-12 form-group">
              <label for="flagged">Flagged for review</label>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary btn-lg">
                  <input type="radio" name="options" id="flagged" autocomplete="off"> Yes
                </label>
                <label class="btn btn-secondary btn-lg">
                  <input type="radio" name="options" id="flagged" autocomplete="off"> No
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-md-2 form-group text-center">
          <label>&nbsp;</label>
          <button type="submit" class="btn btn-success btn-lg" id="submit">Submit</button>
        </div>
      </div>
    </div>
  </form>
  <?php require 'partials/footer.html' ?>
  <?php require 'partials/js.html' ?>
  <?php require 'partials/js_new_qa.html' ?>
</body>
</html>
