
const currentState = history.state;

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.pageId === 'verify') {
        const section = document.getElementById('verificationSection');
        section.style.display = 'flex';
    } else {
        const section = document.getElementById('verificationSection');
        section.style.display = 'none';
    }
});





let signupbtn = document.getElementById("signup-page");
let loginpage = document.getElementById('login');
let signuppage = document.getElementById('signup');
let loginbtn = document.getElementById('login-page');
let pwShowHide = document.querySelectorAll(".showHidePw");
let pswdfields = document.querySelectorAll(".inputpassword");
let signup_errorsection = document.getElementById('sign-up-errorsection');
let login_errorsection = document.getElementById('login-errorsection');
let line = document.querySelectorAll('.ll');

//...............................eye hide and show section...........................................................

    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", (event)=>{
            let pwField = event.target.parentElement.querySelector(".inputpassword");
            let icon = event.target.parentElement.querySelector(".showHidePw")
                      if(pwField.type ==="password"){
                    pwField.type = "text";

                        icon.classList.replace("uil-eye-slash", 'uil-eye');   
                    
                }else{
                    pwField.type = "password";

                        icon.classList.replace("uil-eye", "uil-eye-slash");
                }
            
        });
    });

//....................................... code to appear signup and login form...................................................
    signupbtn.addEventListener("click", ()=>{
        loginpage.style.display='none';
        signuppage.style.display='block';
    });
    loginbtn.addEventListener("click", ()=>{
        loginpage.style.display='block';
        signuppage.style.display='none';
    });

//....................................code to appear the show and hide images....................................

    pswdfields.forEach(pswd =>{
      pswd.addEventListener('input', (event)=>{
        event.preventDefault();
       let icon = event.target.parentElement.querySelector(".showHidePw");
       icon.style.display='initial';
      });
    });
//................................. sending sign up page to the server...............
document.addEventListener('DOMContentLoaded',()=>{
      let allCountries = [];

  async function fetchCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      allCountries = await response.json();
      populateCountryDatalist(allCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }


  function populateCountryDatalist(countries) {
    const countryDatalist = document.getElementById('countries');
    countryDatalist.innerHTML = countries.map(country => 
      `<option value="${country.name.common}" data-code="${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}" data-country="${country.cca2}">${country.name.common}</option>`
    ).join('');
  }

  function filterCountries(event) {
    const searchQuery = event.target.value.toLowerCase();
    const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(searchQuery));
    populateCountryDatalist(filteredCountries);
  }


  async function fetchCities(countryCode) {
    try {
      const username = 'clementdevs';  
      const response = await fetch(`https://secure.geonames.org/searchJSON?country=${countryCode}&cities=cities500&maxRows=1000&username=${username}`);
      const data = await response.json();
      const cities = data.geonames;
      populateCityDatalist(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }

  function populateCityDatalist(cities) {
    const cityDatalist = document.getElementById('cities');
    cityDatalist.innerHTML = cities.map(city => `<option value="${city.name}">${city.name}</option>`).join('');
    document.getElementById('cityInput').disabled = false;
  }

  function updateCitiesAndPhoneCode() {
    const countryInput = document.getElementById('countryInput');
    const selectedOption = document.querySelector(`#countries option[value="${countryInput.value}"]`);

    if (selectedOption) {
      const countryCode = selectedOption.getAttribute('data-country');
      const phoneCode = selectedOption.getAttribute('data-code');
      if (phoneCode) {
        document.getElementById('phoneInput').value = phoneCode + ' ';
      } else {
        console.log('No phone code found for the selected country');
      }

      fetchCities(countryCode);
    } else {
      document.getElementById('cities').innerHTML = '';
      document.getElementById('cityInput').disabled = true;
      document.getElementById('phoneInput').value = '';
    }
  }

  document.addEventListener('DOMContentLoaded', fetchCountries);

  document.getElementById('countryInput').addEventListener('input', filterCountries);
  document.getElementById('countryInput').addEventListener('change', updateCitiesAndPhoneCode);
});

    let email = '';
    let username = '';
    let password = '';
    let confirm_password = '';
    let phoneNumber = '';
    let country = '';
    let city = '';
    let ref = '';

document.getElementById('register').addEventListener('submit', (e) => {
    e.preventDefault();

          email = document.getElementById('email');
          username = document.getElementById('userid');
          password = document.getElementById('signup-password');
          confirm_password = document.getElementById('Confirm-password');
          phoneNumber = document.querySelector("#phoneInput");
          country = document.getElementById('countryInput');
          city = document.getElementById('cityInput');
          ref = document.getElementById('ref');
    const signup_errorsection = document.getElementById('sign-up-errorsection');


    const requiredFields = [email, username, password, confirm_password, phoneNumber, country, city];

    let allFieldsFilled = true; 

    requiredFields.forEach(field => {
        if (!field.value.trim()) { 
        field.style.border = '1px solid red';
        allFieldsFilled = false;
    } else {
        field.style.border = '';
    }
});


    if (!allFieldsFilled) {
        signup_errorsection.textContent = "Please fill in all the fields.";
        return; 
    }


    function isValidpswd1(password) {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return pattern.test(password);
    }

    if (password.value !== confirm_password.value) {
        signup_errorsection.textContent = "Password and confirm password must be the same.";
        confirm_password.style.border = '2px solid red';
        return;
    } else if (!isValidpswd1(password.value)) {
        signup_errorsection.textContent = "Password must contain at least 8 characters, including one uppercase and one lowercase letter.";
        password.style.border = '2px solid red';
        return;
    }

    signup_errorsection.textContent = "";
    registration();
});


    function registration(){

        const userData = {
            email: email.value,
            username: username.value,
            password: password.value,
            phone: phoneNumber.value,
            country: country.value,
            city: city.value,
        };
      
      if (ref) {
        userData.ref = ref;
    }
            fetch('/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    console.log(data);
                    alert(`Hey '${data.username}', registration was a success. Please verify your email to continue.`);
                    verifaction(email.value);
                } else {
                    signup_errorsection.textContent = data.error;
                }
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred during registration. Please try again later.');
            });
        }
function verifaction(email){
    fetch('/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Verification code sent to your email.");
                const section = document.getElementById('verificationSection');
                section.style.display='flex';
        } else {
            alert(data.error);
            const section = document.getElementById('verificationSection');
            section.style.display='none';
            loginpage.style.display = 'none';
            signuppage.style.display = 'block';
        }
    })
    .catch(error => {
        console.error(error);
        alert('An error occurred in verification. Please try again later.');
    });
}

  const verificationCodeInput = document.getElementById('verificationCode');
  const verifyButton = document.getElementById('verifyButton');
  const verificationMessage = document.getElementById('verificationMessage');

  function runVerification() {
    const code = verificationCodeInput.value;
    if (code.length === 6) {
    fetch('/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        verificationCode: code,
        email: email.value
      })
    }) 
       .then(response => response.json())
       .then(data =>{
        console.log(data)
        if (data.success){
              verificationMessage.textContent = 'Verification successful!';
              loginpage.style.display = 'block';
              signuppage.style.display = 'none';
                const section = document.getElementById('verificationSection');
                section.style.display='none';
        }if(data.message=="expired"){
            verificationMessage.textContent = 'Expired verification Code Please try again';
            const section = document.getElementById('verificationSection');
            const resendButton = document.getElementById('resendVerification');
                  resendButton.style.display = 'block';
        }
        else{
            verificationMessage.textContent = 'invalid verification Code';
        }
       }).catch(error => {
        console.error('Error:', error);
        verificationMessage.textContent = 'An error occurred. Please try again.';
    });

    } else {
      verificationMessage.textContent = 'Code must be 6 digits long.';
    }
  }

  verificationCodeInput.addEventListener('input', () => {
    if (verificationCodeInput.value.length === 6) {
      runVerification();
    }
  });

  verifyButton.addEventListener('click', () => {
    runVerification();
  });


//................................. sending login page to the server...............
let login_email = '';
document.getElementById('submit-login').addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllFields();
    document.getElementById('login-password').disabled = true;
    let login_password = document.getElementById('login-password').value;
        login_email = document.getElementById('userid1').value;
        email = document.getElementById('userid1');
    if (!login_password || !login_email) {
        login_errorsection.textContent = "Please fill in all the fields.";
        line.forEach((border) => {
            border.style.opacity = '1.0';
            border.style.border = 'solid 1px red';
        });
    } else {
        login_errorsection.textContent = "";
        fetch('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: login_password,
                email: login_email
            })
        })
        .then(response => {
            const status = response.status;
            return response.json().then(data => ({ data, status })); 
        })
        .then(({ data, status }) => {
            if (status === 403 && data.error === 'Email not verified') {
                alert('Your email is not verified. Please verify your email.');
                verifaction(email);
            } else if (status === 200 && data.message==='Login successful') {
                window.location.href = '/#profile';
                } else if (data.message) {
                    if (data.message === 'Already logged in') {
                        alert(`You are already logged in as ${data.user.username}`);
                        window.location.href = '/#profile';
                    } else {
                        alert(data.message);
                        document.getElementById('login-password').disabled = false;
                        }
                        } else if (data.error) {
                             if(data.error === 'Account deleted') {
                                document.getElementById('recover-account-section').style.display = 'block';
                                document.getElementById('login-password').disabled = false;
                                alert('The Account is already deleted please click the recover button is you wish to get back to your account')
                                }else{
                            document.getElementById('login-password').disabled = false;
                            alert(data.error);
                        }
                            } else {
                                alert('Unexpected response from server.');
                                document.getElementById('login-password').disabled = false;
                                }
            })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('login-password').disabled = false;
            login_errorsection.textContent = 'Failed to login. Please refresh and try again.';
        });
    }
});

const resendVerificationButton = document.getElementById('resendVerification');
  const timerMessage = document.getElementById('timerMessage');
  let countdownInterval;

  function startCountdown(duration) {
    let timeRemaining = duration;
    resendVerificationButton.style.pointerEvents = 'none';
    resendVerificationButton.style.color = 'grey';

    countdownInterval = setInterval(() => {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerMessage.textContent = `You can resend the code in ${minutes}:${seconds < 10 ? '0' : ''}${seconds} minutes`;

      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        timerMessage.textContent = ''; 
        resendVerificationButton.style.pointerEvents = 'auto'; 
        resendVerificationButton.style.color = 'blue';
      }
      timeRemaining--;
    }, 1000);
  }


  resendVerificationButton.addEventListener('click', () => {
    startCountdown(60);
    verifaction(login_email);
  });



  // Function to clear all fields in the sign up form
function clearAllFields() {
    const fields = [
        document.getElementById('email'),
        document.getElementById('userid'),
        document.getElementById('ref'),
        document.getElementById('countryInput'),
        document.getElementById('cityInput'),
        document.getElementById('phoneInput'),
        document.getElementById('signup-password'),
        document.getElementById('Confirm-password')
    ];

    fields.forEach(field => {
        if (field) {
            field.value = '';
        }
    });


    const countryDatalist = document.getElementById('countries');
    const cityDatalist = document.getElementById('cities');
    if (countryDatalist) {
        countryDatalist.innerHTML = ''; 
    }
    if (cityDatalist) {
        cityDatalist.innerHTML = '';
    }
}


//.................................acount recovery...............................................
 function recoveracc(){

    }
    document.getElementById('recover-account-btn').addEventListener('click', () => {
  if (confirm('Are you sure you want to recover your account?')) {
    fetch('/recover-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Account recovered successfully') {
          alert(data.message);
          window.location.href = '/#profile'; 
        } else {
          alert(data.error || 'An error occurred while recovering the account.');
        }
      })
      .catch(error => {
        console.error('Error during account recovery:', error);
      });
  }
});