//...................................................navigation section .........................................
function getelement(argument) {
  const element =  document.querySelector(`#${argument}`).children.item(0);
  return element;
}
let currentState = {};
let previousState = {};
 const initialState = window.location.hash.substr(1);
  showPage(initialState);


  if ('history' in window && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('popstate', function (event) {
    event.preventDefault;
    var state = event.state;
    if (state) {
      showPage(state.pageId);
    previousState = currentState;
    currentState = event.state;
    //console.log('Current State:', currentState);
    //console.log('Previous State:', previousState);

    if (currentState && currentState.pageId) {
        showPage(currentState.pageId);
    } else {
        Initialpage();
    }
} else {
        Initialpage();
    }
});


  document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    alert('This site is still under development');
    clickedbar();
    addprofile();
    category();
    menubar();
    discussion();
    history.state;
  if (history.state) {
    const pageid = history.state.pageId.split('#').pop();
    showPage(pageid);
   }else{
        const currenthash = window.location.hash.split('#').pop();
        showPage(currenthash);
   }
});

//........................................script to properly navigate the website...........................................

  function showPage(pageId) {

    switch (pageId) {
      case 'home':
        // Logic for the initial page
        Initialpage();
        break;
      case 'courses':
        //logic for the course page 
        coursepage();
        break;
      case 'resources':
        // Logic for resources page 
        resourcespage();
        break;
      case 'blog':
        //logic for the blog page
        blogpage();
        break;
      case 'community':
        //logic for the community page
        communitypage();
        break;
      case 'about':
        //logic for the about page
        aboutpage();
        break;
      case 'contact':
        //logic for the contact page
        contactpage();
        break;
      case 'profile':
        //logic for the profile page
        profilepage();
        break;
      case 'affiliate':
        //logic for the affiliate page
        afiliatepage();
        break;
      default:
        // Default case or fallback logic
        Initialpage();
        break;
    }
  }


function category() {
        const categorySelect = document.getElementById('category');
    const courseCards = document.querySelectorAll('.course-card');

    categorySelect.addEventListener('change', function () {
        const selectedCategory = this.value;

        courseCards.forEach(card => {
            if (selectedCategory === 'all' || card.classList.contains(selectedCategory)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}



function clickedbar(){
        const navItems = document.querySelectorAll('li');
        //console.log(navItems);
        navItems.forEach(item => {
            item.addEventListener('click', handleNavLinkClick);
        });

}
    // Function to handle navigation link clicks
    function handleNavLinkClick(event) {
        event.preventDefault();
            const targetId = event.currentTarget.querySelector('a').getAttribute('href').substring(1);
            const currentState = history.state;
            if (!currentState || currentState.pageId !== targetId){
                const path = `#${targetId}`;
                history.pushState({ pageId: `#${targetId}` }, '', path);
                }
            displayitems();
    }

//.............smaller devices clicks................
function menubar(){
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const Screen = document.querySelector('.screen');
const header = document.querySelector('.header');
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('nav-links-active');
        Screen.classList.toggle('screen-active');
        header.classList.toggle('active-header');
        event.stopPropagation();
    });
     document.addEventListener('click', (event) => {
        if (!hamburgerMenu.contains(event.target) && !navLinks.contains(event.target)) {
            closeMenu();
        }
    });
    function closeMenu() {
        navLinks.classList.remove('nav-links-active');
        Screen.classList.remove('screen-active');
        header.classList.remove('active-header');
}
}









  function displayitems(){
        const currenthash = window.location.hash.split('#').pop();
        showPage(currenthash);
  }

  function navLinks(currenthash){
    const targetSection = document.getElementById(currenthash);
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
  }

  //...intial page code
 
  function Initialpage(){
        document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
        });
        const targetSection = document.getElementById('home');
              targetSection.style.display = 'block';
              targetSection.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('contact').style.display = 'block';
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card=>{
            card.style.display='block';
        })
  }

  //.....courses page intial page code 
   function coursepage() {
    document.querySelectorAll('.Course_info').forEach(Course_info=>{
        Course_info.style.display='block';
        });
    navLinks('courses');
   }
   document.querySelector('.Explore').addEventListener('click',(event)=>{
    event.preventDefault();
    const currentState = history.state;
    if (!currentState || currentState.pageId !== 'courses'){
                const path = `#courses`;
                history.pushState({ pageId: `courses` }, '', path);
                }
        coursepage();
   });
        //.....resources page intial page code 
   function resourcespage() {
    navLinks('resources');
   }
     //.....blog page intial page code 
   function blogpage() {
     navLinks('blog');
     addingblogs();
   }
        //.....community page intial page code 
   function communitypage() {
   // discussion();
    navLinks('community');
   }
     //.....about us page intial page code 
   function aboutpage() {
    navLinks('about');
   }
        //.....contact page intial page code 
   function contactpage() {
    navLinks('contact');
   }
     //.....profile page intial page code 
   function profilepage() {
    checkAuthStatus().then(user => {
      if (user) {
          populatesections(user);
          navLinks('profile');
          } else {
            //console.log('Not authenticated');
            window.location.href = '/register.html';
            }
      });
   }

        //.....afiliate page intial page code 
   function afiliatepage() {
      checkAuthStatus().then(user => {
        navLinks('affiliate');
      if (user) {
                document.querySelector('.affiliate-info').style.display='none';
                loadAffiliateData(user.username);
                generateAffiliateLink(user.username);
          } else {
            document.querySelector('.affiliate-info').style.display='block';
            }
      });
   }



//mobile view for the card
   document.querySelectorAll('.more_info').forEach(morebtn=>{
    morebtn.addEventListener('click',(event)=>{
      event.preventDefault();
      const parentelement = event.target.closest('div');
      parentelement.querySelector('.info').style.display='block';
      event.target.style.display='none'
    });
   });

   document.querySelectorAll('.less_info').forEach(lessbtn=>{
    lessbtn.addEventListener('click',(event)=>{
      event.preventDefault();
      const parentelement = event.target.closest('div');
      parentelement.querySelector('.info').style.display='none';
      parentelement.querySelector('.more_info').style.display='block'
    });
   });





//........................................contact section...........................................
   document.getElementById('send-email').addEventListener('submit',(event)=>{
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (!name ||!email ||!message) {
      document.getElementById('alert-box').textContent='fill in all the fields';
    }else{
      fetch('/send-email',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  name : name,
                  email : email,
                  message : message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    alert(`message was sent successfully`);
                } else {
                     document.getElementById('alert-box').textContent = 'Error sending an email Please try again later';
                }
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred during registration. Please try again later.');
            });
    }
   });

//........................................courses section...........................................

let courseclicked = document.querySelectorAll('.more');
 courseclicked.forEach(course=>{
    course.addEventListener('click',(event)=>{
        event.preventDefault();
        const target_course = event.target.parentNode.querySelector('h4').getAttribute('info');
        const currentState = history.state;
        if (!currentState || currentState.pageId !== target_course){
            const path = `#course/${target_course}`;
            history.pushState({ pageId: 'course' }, '', path);
            }
        displaycourse();
    })      
 });

 function displaycourse(){
     const currenthash = window.location.hash.split('/').pop();
     console.log(currenthash);
     const course_element = document.getElementById(currenthash);
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('courses').style.display='block';
    document.querySelectorAll('.Course_info').forEach(Course_info=>{
      Course_info.style.display='none';
    });
    const width = window.innerWidth;
    if(width<768){
        course_element.style.display='block';
    }else{
        course_element.style.display='flex';
    }
 }






   //............................................... blog section............................

function addingblogs(){
      fetchBlogs();

function fetchBlogs() {
  fetch('/api/blogs')
    .then(response => response.json())
    .then(data => {
      const blogList = document.getElementById('blog-list');
      const noBlogs = document.getElementById('no-blogs');

      if (data.length > 0) {
        noBlogs.style.display = 'none';
        blogList.innerHTML = ''; 

        data.forEach(blog => {
          const blogItem = document.createElement('div');
          blogItem.classList.add('blog-post');
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = blog.content;
          const firstImage = tempDiv.querySelector('img') ? tempDiv.querySelector('img').src : '';
          blogItem.innerHTML = `
            <h3><a href="/blog/${blog.id}">${blog.title}</a></h3>
            <p>${new Date(blog.date).toDateString()}</p>
            ${firstImage ? `<img src="${firstImage}" alt="${blog.title}" class="blog-image" style="width:100%; max-height:200px; object-fit:cover;" />` : ''}
            <p class="summary">${blog.content.replace(/<img[^>]*>/g, '').replace(/<h2>/g, '<h4>').replace(/<\/h2>/g, '</h4>').replace(/<\/?strong>/g, '').substring(0, 150)}...<h3><a href="/blog/${blog.id}">learn more</a></h3></p>
          `;
          blogList.appendChild(blogItem);
        });
      } else {
        noBlogs.style.display = 'block';
      }
    })
    .catch(error => console.error('Error fetching blogs:', error));
}

  const commentForm = document.querySelector('form[action^="/blog/"][action$="/comment"]');
  const reactionForm = document.querySelector('form[action^="/blog/"][action$="/react"]');

  if (commentForm) {
    commentForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(commentForm);
      
      fetch(commentForm.action, {
        method: 'POST',
        body: formData
      })
      .then(response => response.redirected ? window.location.href = response.url : alert('Error adding comment'))
      .catch(error => console.error('Error adding comment:', error));
    });
  }

  if (reactionForm) {
    reactionForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(reactionForm);
      
      fetch(reactionForm.action, {
        method: 'POST',
        body: formData
      })
      .then(response => response.redirected ? window.location.href = response.url : alert('Error adding reaction'))
      .catch(error => console.error('Error adding reaction:', error));
    });
  }
}


checkAuthStatus().then(user => {
  if (user.email  === 'example@gmail.com') {
  document.querySelector('#admin-button').style.display = 'block';
} else {
  document.querySelector('#admin-button').style.display = 'none';
}
      });









 //...................................community section............................
 document.getElementById('topic-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('topic-title').value;
    const content = document.getElementById('topic-content').value;
    const contentlength = content.substring();
    if(!title){
        alert('please add a title');
    }else if(contentlength<200){
         alert('your overview needs to be 200 characters or more')
    }
    fetch('/adddiscussion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        alert(data.error);
      }else{
        document.getElementById('topic-title').value = '';
        document.getElementById('topic-content').value = '';
        addDiscussionToList(data);
        alert('discussion added successfully');
      }
    })
    .catch(error => console.error('Error:', error));
});

// Function to add a discussion to the list
function addDiscussionToList(discussion) {
    const discussionList = document.getElementById('discussion-list');
    const discussionElement = document.createElement('div');
    discussionElement.classList.add('discussion');
    discussionElement.innerHTML = `
        <h4>${discussion.title}</h4>
        <p>${discussion.content.substring(0, 200)+'...'}</p>
        <a href="discussion/${discussion.id}" class="btn">Join the Discussion</a>
    `;
    discussionList.append(discussionElement);
    discussionList.scrollIntoView({ behavior: 'smooth' });
}


function discussion() {
    fetch('/discussions')
    .then(response => response.json())
    .then(data => {
      console.log(data);
        data.forEach(addDiscussionToList);
    })
    .catch(error => console.error('Error fetching discussions:', error));
}



//...........................................................profile section................................
// Function to check if the user is authenticated
async function checkAuthStatus() {
  try {
    const response = await fetch('/auth-status', {
      method: 'GET',
      credentials: 'include'
    });
    
    const result = await response.json();
    
    if (response.ok && result.authenticated) {
      //console.log('User is authenticated:', result.user);
      return result.user;
    } else {
      //console.log('User is not authenticated');
      return null;
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return null;
  }
}
  const user_name = document.querySelector('.user_name_display');
  const name_input = document.getElementById('username');
  const user_email = document.querySelector('.user_email_display');
  const email_input = document.getElementById('Email');
  const full_name = document.querySelector('#full-name');
  const country = document.querySelector('.user_state');
  const city = document.querySelector('.user_city');
  const phone = document.querySelector('.user_phone');
//function to populate the details
function populatesections(user){
     user_name.textContent = user.username;
     name_input.value = user.username;
     user_email.textContent = user.email;
     email_input.value = user.email;
      if (user.full_name) {
        full_name.value = user.full_name;
      }
      country.value = user.country;
      city.value = user.city ;
      phone.value = user.phone
}
function addprofile(){
    const profilePictureInput = document.getElementById('profile-picture-input');
    const profilePicture = document.getElementById('user-image');
        profilePicture.addEventListener('click',()=>{
        //console.log(profilePictureInput);
        profilePictureInput.click();
    });
    profilePictureInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicture.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

}

function toggleEditProfile() {
    const profileInfo = document.querySelector('.profile-info');
    const editForm = document.getElementById('edit-profile-form');

    profileInfo.style.display = 'none';
    editForm.style.display = 'block';

    document.getElementById('full-name').value = document.getElementById('full-name-display').textContent;
    document.getElementById('username').value = document.getElementById('user_name_display').textContent;
    document.getElementById('email').value = document.getElementById('user_email_display').textContent;
}

function cancelEdit() {
    document.querySelector('.profile-info').style.display = 'block';
    document.getElementById('edit-profile-form').style.display = 'none';
}

document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('full-name-display').textContent = document.getElementById('full-name').value;
    document.getElementById('user_name_display').textContent = document.getElementById('username').value;
    document.getElementById('user_email_display').textContent = document.getElementById('email').value;

    cancelEdit();
});

//..................log out functionality....................................
function  logoutUser(){
  fetch('/logout', {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Logout successful') {
      alert('You have successfully logged out')
      window.location.href = '/';
    }
  })
  .catch(error => {
    console.error('Error during logout:', error);
  });
}

//..................account deletion..................................
function deleteAccount(){
  document.getElementById('delete-account-modal').style.display = 'block';
}
document.getElementById('confirm-delete-account-btn').addEventListener('click', () => {
  const password = document.getElementById('delete-account-password').value;

  if (!password) {
    alert('Please enter your password.');
    return;
  }

  fetch('/delete-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Account deleted successfully') {
        alert(data.message);
        window.location.href = '/';
      } else {
        alert(data.error || 'An error occurred while deleting the account.');
      }
    })
    .catch(error => {
      console.error('Error during account deletion:', error);
    });
});

// Cancel deletion
document.getElementById('cancel-delete-account-btn').addEventListener('click', () => {
  document.getElementById('delete-account-modal').style.display = 'none';
});


//....................................................... affliate section..................................
  async function loadAffiliateData(userId) {
    userId = userId;
    const res = await fetch(`/api/affiliate-dashboard?userId=${userId}`);
    const data = await res.json();

    document.getElementById('wallet-balance').innerText = `$${data.wallet_balance}`;
    document.getElementById('affiliate-earnings').innerText = `$${data.total_earnings}`;
  }

  async function generateAffiliateLink(userId) {
    const res = await fetch('/api/generate-affiliate-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
    document.getElementById('affiliate-link').value = data.link;
  }

  document.getElementById('withdraw-btn').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    const method = document.getElementById('withdraw-method').value;
    if(amount){
    const res = await fetch('/api/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({method, amount })
    });
    const data = await res.json();
    alert(data.message);
  }else{
    alert('Please enter the amount');
  }
  });