## Code Review Exercise

Write your code review here in markdown format.

### Issue #1: Submit and Reset Buttons

The submit and reset buttons at the bottom of the page are outside of the </form> tag, so they aren't actually bound to the form. Pressing them does nothing.

# Initial Code:

</form> 
<div class="form space-evenly-distributed-row-container form-buttons-container"> 
    <input class="form-button" type="submit" value="submit" /> 
    <input class="form-button" type="reset" value="reset" /> 
</div>

# Updated Code:

<div class="form space-evenly-distributed-row-container form-buttons-container"> 
    <input class="form-button" type="submit" value="submit" />
    <input class="form-button" type="reset" value="reset" /> 
</div> 
</form>

### Issue #2: "Load New Cats Facts" button does nothing

Inside of fetchCatFacts(), the loading container has the class as display-none in the finally block,
which means that when the user clicks the Load New Cats Facts button, createLoadingContainer adds another
loader image but the container is still hidden. Because of this, the loading animation won't appear and
extra loader images will keep getting added.

# Initial Code:

const createLoadingContainer = function () {
const loadingContainer = document.querySelector('.loading-container');
const loader = document.createElement('img');
loader.src = '../../images/loader.gif';
loader.alt = 'loader gif while the data loads';
loader.width = 60;
loader.height = 60;
loadingContainer.append(loader);
};

Finally block:

finally {
const loading = document.querySelector('.loading-container');
loading.setAttribute('class', 'display-none');
}

# Updated Code:

const createLoadingContainer = function () {
const loadingContainer = document.querySelector('.loading-container');
loadingContainer.classList.remove('display-none');
loadingContainer.replaceChildren();
const loader = document.createElement('img');
loader.src = './images/loader.gif';
loader.alt = 'loader gif while the data loads';
loader.width = 60;
loader.height = 60;
loadingContainer.append(loader);
};

Finally Block:

finally {
const loading = document.querySelector('.loading-container');
loading.classList.add('display-none');
loading.replaceChildren();
}

### Issue #3: More Info button tags

The more info buttons are <a> tags without any href. <a> is meant for navigation,
and since this element opens a JS popup, it should be a real button to improve semantics and accessibiltiy.

# Initial Code

<a class="more-info-button">More Info</a>

# Updated Code

<button class="more-info-button" type="button">More Info</button>

### Issue #4: Empty buttons violating WAVE check

The close buttons on the first two "more info" popupsonly contain an icon and not an
accessible label, which means that screen readers would not be able to understand what the button is for.

# Initial Code

<button class="close-popup-button">
  <i class="fa-solid fa-xmark"></i>
</button>

# Updated Code

<button
class="close-popup-button"
aria-label="Close popup window"
title="Close popup window"

> <i class="fa-solid fa-xmark"></i>
> </button>
