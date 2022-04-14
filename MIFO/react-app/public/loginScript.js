var baseURL = "http://localhost:3080";


$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});

//$(document).ready(function() {
//    $('loginSubmission').click(function (e) {
//        e.preventDefault();
//    });
//});

                  
                  

const loginForm = document.getElementById("loginForm");

const registrationForm = document.getElementById("registrationForm");

const z = document.getElementById("login-buttons");

//LOGIN FORM STUFF: ----------------------------------------------
const loginEmailField = document.getElementById("loginEmailField");

const loginPasswordField = document.getElementById("loginPasswordField");

const loginCheckbox = document.getElementById("loginCheckbox");

const loginErrorMessages = document.getElementById("loginErrorMessages");
//------------------------------------------------------------------



//REGISTRATION FORM STUFF: -----------------------------------------
const registrationEmailField = document.getElementById("registrationEmailField");

const registrationNameField = document.getElementById("registrationNameField");

const registrationDepartmentField = document.getElementById("registrationDepartmentField");

const registrationPasswordField = document.getElementById("registrationPasswordField");

const registrationCheckbox = document.getElementById("registrationCheckbox");

const registrationErrorMessages = document.getElementById("registrationErrorMessages");
//-------------------------------------------------------------------
    

function registerButtonPressed() {
    loginForm.style.visibility = "hidden";
    registrationForm.style.visibility = "visible";
    
    loginForm.style.left = "-400px";
    registrationForm.style.left = "0px";
    
    z.style.left = "50%";
}

function loginButtonPressed() {
    registrationForm.style.visibility = "hidden";
    loginForm.style.visibility = "visible";
    
    registrationForm.style.left = "400px";
    
    loginForm.style.left = "0px";
    
    z.style.left = "0%";


} 

loginForm.addEventListener('submit', (e) => {
        
    //it will do whatever we tell it to here BEFORE defulatAction
    
    let errorMessages = [];
    
    if(loginEmailField.value === '' || loginEmailField.value == null) {
        errorMessages.push('E-mail is required');
    }
    
    if(loginPasswordField.value.length < 3) {
        errorMessages.push("Password must be longer than 2 characters");
    }
    
    if(loginPasswordField.value.length >= 20) {
        errorMessages.push("Password must be less than 20 characters");
    }
    
    if(loginPasswordField.value.toLowerCase() === "password") {
        errorMessages.push("Password cannot be password");
    }
    
    if(errorMessages.length > 0) {
        //console.log(errorMessages, "hello");
        e.preventDefault();
        loginErrorMessages.innerText = errorMessages.join(', ');
        return;
    }
    
    
    fetchLogin()
    .then(dataReturnedAsJSON => {
        console.log(dataReturnedAsJSON);
        if(dataReturnedAsJSON.success) {
            loginErrorMessages.innerText = "Successfully authenticated! Redirecting";
            loginErrorMessages.style.color = "green";
            $("loginForm").unbind('submit').submit();
            let parametersDict= {
                email: loginEmailField.value,
                password: loginPasswordField.value
            };
            postToSearchPage(baseURL + "/searchPage", parametersDict);

            
        }
        else if(dataReturnedAsJSON.inputParseFail) {
            loginErrorMessages.innerText = "Invalid input format";
        }
        else if(dataReturnedAsJSON.invalidEmail) {
            loginErrorMessages.innerText = "No such account with that E-Mail exists";
        }
        else if(dataReturnedAsJSON.invalidPassword) {
            loginErrorMessages.innerText = "Invalid password";
        }
    });
    
    e.preventDefault();

    

    /*.then(response => {
        
        if(response.ok) {
            console.log("SUCCESS. RESPONSE 200-299. Below is response before it is json-ified");
            console.log(response);
           
        }
        else {
            console.log("NOT SUCCESSFUL. MAYBE 404");
        }
        //response.json();
    });

            
    happens even in 404 fetch ALWAYS succeeds unless the internet fails maybe
    happens even in 404 fetch ALWAYS succeeds unless the internet fails maybe */
    
    
}); 

async function fetchLogin() {
    
    let fetchOptions = {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify ({
            email: loginEmailField.value,
            password: loginPasswordField.value
        })
    };
    
    let loginResponse = await fetch(baseURL + "/login", fetchOptions)
    
    let loginResponseAsJSON = await loginResponse.json();
    
    return loginResponseAsJSON;
}


registrationForm.addEventListener('submit', (e) => {
    
    //it will do whatever we tell it to here BEFORE defaultAction
    

    let errorMessages = [];
    
    if(registrationEmailField.value === '' || registrationEmailField.value == null) {
        errorMessages.push('E-mail is required');
    }
    
    if(registrationNameField.value === '' || registrationNameField.value == null) {
        errorMessages.push('Name is required');
    }
    
    if(registrationPasswordField.value.length < 4) {
        errorMessages.push("Password must be longer than 3 characters");
    }
    
    if(registrationPasswordField.value.length >= 20) {
        errorMessages.push("Password must be less than 20 characters");
    }
    
    if(registrationPasswordField.value.toLowerCase() === "password") {
        errorMessages.push("Password cannot be password");
    }
    
    
    if(errorMessages.length > 0) {
        //console.log(errorMessages, "hello");
        if(registrationErrorMessages.style.color = "green")
            registrationErrorMessages.style.color = "red";
        e.preventDefault();
        registrationErrorMessages.innerText = errorMessages.join(', ');
        return;
    }
    
    
    fetchRegistration()
    .then(dataReturnedAsJSON => {
        console.log(dataReturnedAsJSON);
        if(dataReturnedAsJSON.success) {
            registrationErrorMessages.innerText = "Successfully registered! Please login";
            registrationErrorMessages.style.color = "green";
            window.location.href = baseURL + "/";

        }
        else if(dataReturnedAsJSON.inputParseFail) {
            registrationErrorMessages.innerText = "Invalid input format";
        }
        else if(dataReturnedAsJSON.invalidEmail) {
            registrationErrorMessages.innerText = "An account with that E-Mail is already in use.";
        }
    });
    
    
    e.preventDefault();
    
})


async function fetchRegistration() {
    
    let fetchOptions = {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify ({
            email: registrationEmailField.value,
            name: registrationNameField.value,
            department: registrationDepartmentField.value,
            password: registrationPasswordField.value
        })
    };
    
    let loginResponse = await fetch(baseURL + "/register", fetchOptions)

    
    let loginResponseAsJSON = await loginResponse.json();
    
    return loginResponseAsJSON;
}


function postToSearchPage(path, parameters) {
    
    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", path);
    //form.style.display = 'none';

    $.each(parameters, function(key, value) {
        var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });

    // The form needs to be a part of the document in
    // order for us to be able to submit it.
    $(document.body).append(form);
    form.submit();
}

