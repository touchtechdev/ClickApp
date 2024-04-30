

    // Function to parse URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Get the username from the URL
    var username = getUrlParameter('username');
    document.getElementById('username').textContent = username;

    // Array to store click counts for each color
    let clickCounts = {
        red: 0,
        green: 0,
        blue: 0,
        yellow: 0,
        white: 0,
        black: 0
    };

    // Get all cells
    const cells = document.querySelectorAll('.cell');

    // Add click event listener to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            const color = this.style.backgroundColor;
            clickCounts[color]++;
            updateClickCounts();
        });
    });


// Function to update click counts table
function updateClickCounts() {
    const tbody = document.querySelector('#clickCounts tbody');
    tbody.innerHTML = '';
    for (const color in clickCounts) {
        const count = clickCounts[color];
        const row = `
            <tr>
                <td>
                    <button class="color-button" data-color="${color}">${color}</button>
                </td>
                <td>${count}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    }
        // Update cell counts in the matrix
        cells.forEach(cell => {
            const color = cell.style.backgroundColor;
            const count = clickCounts[color];
            const cellCount = cell.querySelector('.cell-count');
            cellCount.textContent = count;
        });
    

    // Function to get click count for a specific color from the API
 /*   async function getClickCount(color) {
        try {
            const response = await fetch(`http://api.example.com/ClickCount?color=${color}`);
            const data = await response.json();
            return data.clickCount;
        } catch (error) {
            console.error('Error fetching click count:', error);
            return null;
        }
    } */

    // Add event listeners to color buttons to fetch click counts
        // Add event listeners to color buttons
    const colorButtons = document.querySelectorAll('.color-button');
  



 // const CLICKAPI_SERVICE_URL = 'http://127.0.0.1:3001'
 //   alert(`Service url: ${CLICKAPI_SERVICE_URL}`);
 
 colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;
// obtain credentials for the apis
        SERVICE_URL='https://b63437d2-f460-4dd6-b70a-439f313d4071-dev.e1-us-cdp-2.choreoapis.dev/lkok/click-app-api/click-app-api-194/v1.0'
        serviceURL = SERVICE_URL;
        //console.log('Service URL:', serviceURL);
        const CLICKAPI_SERVICE_URL = serviceURL;
        
       CLIENT_ID="EAbyGf_KlSfEBCwfcd76_ZDdrGQa"
        CLIENT_SECRET="3KwjqAXAsj0EZoRPVk5YCQyB4r0a"
        TOKEN_URL="https://b63437d2-f460-4dd6-b70a-439f313d4071-dev.e1-us-cdp-2.choreosts.dev/oauth2/token"
        
        // Encode client credentials as Base64
        const CLIENT_CREDENTIALS = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
        //console.log('Client Credential:', CLIENT_CREDENTIALS);

        // Request token using client credentials
        fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${CLIENT_CREDENTIALS}` // Use client credentials for authorization
            },
            body: 'grant_type=client_credentials'
        })
        .then(response => response.json())
        .then(tokenData => {
            //const accessToken = tokenData.access_token;
            const accessToken = 'eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZThlNmI5Ny02MzE4LTRmYzctOGE1OS1lM2U5OTJhZWM4YzFAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJDbGljayBBcHAgQVBJIC0gQ2xpY2sgQXBwIEFQSSAxOTQiLCJjb250ZXh0IjoiXC9iNjM0MzdkMi1mNDYwLTRkZDYtYjcwYS00MzlmMzEzZDQwNzFcL2xrb2tcL2NsaWNrLWFwcC1hcGlcL2NsaWNrLWFwcC1hcGktMTk0XC92MS4wIiwicHVibGlzaGVyIjoiY2hvcmVvX3Byb2RfYXBpbV9hZG1pbiIsInZlcnNpb24iOiJ2MS4wIiwic3Vic2NyaXB0aW9uVGllciI6bnVsbH1dLCJleHAiOjE3MTQ0NTAzMjcsInRva2VuX3R5cGUiOiJJbnRlcm5hbEtleSIsImlhdCI6MTcxNDQ0OTcyNywianRpIjoiZjBmYWFlZjYtZmIyNS00YTlkLWEzZmItMWUwMDJiODU4YTU4In0.YrzwJDmOLbifHKqHLeuRrDD_6mFRNPowgQv1STBDEzRaEavrzeuwfU2HMyQj1K4WIdKXy97Sw3TOMQYgTNdpBjs1sBuE3wdiFgvq5wSH07_C25ZfPhvZgCn17ApDaIh3LM8n0QCZzBfoV21axaKzJwXOqhR0EXEbRJqLSbmZ2XshN0yqfSE2Tj_HjVKWsfCaX5S64xS95jFdfwe1Zphg2kWG5Af_oUGjdXufdGC8yENyXM6IFb4_E39KfnXeXTES4Xy1iuezrW9VasEz_v-6GrDWzMiIVaOx-YyKZq423FOCo99N9U__nSeKBCon0q4b8Vd-Mhf6kW-905tic6K_9UNSHOr5E7ndZ2LUREK_kzBtxsPkfb-uCNA8oyk_Ws7KTOig8owoOOPCluLGOU5P4LT6e3SgekqAcbnDzl9R_QP7ImdUwgJ-9sT-03HEAfcQiLe5d2qaMG-0b0QKAB6ltHum0MmZMfkx85tsjJ3KTSiCEwzfhQVT9qLDezwWv4FL92LEamMiZdrF5JsFdQUPP8nD2Sk3C25rnuSH8KNiNyal5A23lGZvpd4IAwMIwHaPr4MzUjbPreqtZIGmn2Uf9iLLK1lANZI8VQQiESXLQhpiG2jSuaiJ86OpsxnMoEZVhpuMBYIHxGk9TkmFb9RD38I5_MWXYdi0OI3TQzvw9Og'
            console.log('accessToken:', accessToken);
            // Use access token to fetch API
            fetch(`${CLICKAPI_SERVICE_URL}/clickApp?color=${color}`, {
                headers: {
                    'API-key': `${accessToken}` // Replace 'your_api_key' with your actual API key
                }
                //                headers: {
//                   'Authorization': `Bearer ${accessToken}` // Include access token in request headers
//                }
            })
            .then(response => response.json())
            .then(data => {
                //console.log(`Click count for ${color}: ${data.count}`);
                alert(`Click count for ${color}: ${data.count}`);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch click counts. Please try again later.');
            });
        })
        .catch(error => {
            console.error('Error obtaining access token:', error);
            alert('Failed to obtain access token. Please try again later.');
        });
    });
});

}

 
    // Update date and time
    function updateDateTime() {
        const dateTimeElement = document.getElementById('dateTime');
        const now = new Date();
        const dateTimeString = now.toLocaleString();
        dateTimeElement.textContent = dateTimeString;
    }

    // Call updateDateTime every second
    setInterval(updateDateTime, 1000);

    // Call updateDateTime on page load
    updateDateTime();

    // Add event listener to the submit button
    document.getElementById('submitButton').addEventListener('click', function() {
        // Prepare the data in JSON format
        const jsonData = {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            username: username,
            clickCounts: clickCounts
        };
        
        // Convert JSON data to a blob
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

        // Create a link element
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'click_data.json';
        document.body.appendChild(a);
        
        // Trigger the click event on the link element to initiate the download
        a.click();
        
        // Send an HTTP request to the API with the JSON data
        //fetch('http://127.0.0.1:3001/clickApp', {
          fetch(`${CLICKAPI_SERVICE_URL}/clickApp`, {    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Handle the response data as needed
            alert('Click counts submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit click counts. Please try again later.');
        });
    });

    // Add event listener to the exit button
    document.getElementById('exitButton').addEventListener('click', function(event) {
        // Confirm exit
        if (!confirm('Are you sure you want to exit without submitting?')) {
            event.preventDefault(); // Cancel the default action (exiting without submitting)
        }
    });
