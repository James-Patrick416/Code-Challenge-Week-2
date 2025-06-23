// this is for getting referrences to the guest form, list and name 
const form = document.getElementById('guest-form');
const guestList = document.getElementById('guest-list');
const guestInput = document.getElementById('guest-name');
// this line is to keep track of how many guests have been added
let guestCount = 0;
// this line shows the maximum number of guests allowed
const MAX_GUESTS = 10;

// this line is to wait for the user to click Add Guest
form.addEventListener('submit', function(e) {
  // this line prevents page from reloading after user has clicked Add Guest
  e.preventDefault(); 
  // this prevents extra spaces typed accidentally and trims them
  const guestName = guestInput.value.trim();
  // this line alerts the user to enter a name b4 submitting 
  if (guestName === '') {
    alert('Please enter a guest name.');
    return;
  }
  // this line alerts the user if maximum guest number has been exceeded
  if (guestCount >= MAX_GUESTS) {
    alert('Guest list is full! Remove someone before adding more.');
    return;
  }
  // ensures that the new guest has been added to the list
  addGuest(guestName);
  // ensures input cleared after adding
  guestInput.value = ''; 
});

//this function adds guest to the Dom list
function addGuest(name) {
  // while this one is to count the guests added
  guestCount++;

  // a new list<li> element for the guest
  const li = document.createElement('li');
  // this assigns a css class called "guest item" to the <li>element that represents a guest 
  li.className = 'guest-item';

  // creates a span to show the guest name
  const nameSpan = document.createElement('span');
  nameSpan.textContent = name;

  // creates a container for the buttons
  const btnContainer = document.createElement('div');

  //creates a delete button 
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remove';
  //listens when the delete button is clicked
  deleteBtn.addEventListener('click', () => {
    // then this line ensures the name is deleted
    guestList.removeChild(li);
    // then this one decreases the count
    guestCount--;
  });

  // creates rsvp button
  const rsvpBtn = document.createElement('button');
  rsvpBtn.textContent = 'Attending';// the default rsvp status
  let attending = true;//tracks rsvp status
  //listens when the button is clicked
  rsvpBtn.addEventListener('click', () => {
    // toggle the status between true or false
    attending = !attending;
    //changes button text based on new status
    rsvpBtn.textContent = attending ? 'Attending' : 'Not Attending';
    // changes the color if not attending to red
    rsvpBtn.style.backgroundColor = attending ? '' : '#f99';
  });

  
  const timestamp = document.createElement('span');
  const now = new Date();// current date and time
  timestamp.textContent = now.toLocaleString();//formats it
  timestamp.style.fontSize = '0.8em';//reduces its text size
  timestamp.style.marginLeft = '10px';// spaces it from the name

  //Adds both buttons to the button container
  btnContainer.appendChild(deleteBtn);
  btnContainer.appendChild(rsvpBtn);
  

  // adds the name time and button container to the list
  li.appendChild(nameSpan);
  li.appendChild(timestamp);
  li.appendChild(btnContainer);

  // ensures the completed guest item is added to the guest list
  guestList.appendChild(li);
}
