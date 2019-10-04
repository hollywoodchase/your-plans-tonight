var error = false;
// var button = ''
function weather(cityName) {

    let weatherToday = {};

    //WEATHER!
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + cityName + "&units=imperial&appid=" + APIKey;

    // console.log(queryURL);

    return $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {


            // console.log(response);

            // Log the data in the console as well
            // console.log("Wind Speed: " + response.wind.speed + "m/h");
            // console.log("Humidity: " + response.main.humidity + "%");
            // console.log("Temperature: " + response.main.temp + "°(F)");
            // console.log("Weather: " + response.weather[0].main);
            // console.log("Description: " + response.weather[0].description);

            let windspeed = response.wind.speed;
            let humidity = response.main.humidity;
            let temperature = response.main.temp;
            let weather = response.weather[0].main;

            let category = '';
            let message = '';

            if (temperature > 65 && temperature < 85 && weather === "Clear" && windspeed < 10) {
                // console.log("It's a beautiful sunny day, let's go outside");
                message = "It's a beautiful sunny day, perfect for a sandwich";
                category = "sandwiches";
            }
            else if (temperature < 65 && temperature > 0 && weather === "Clear") {
                // console.log("It's nice, but a little chilly");
                message = "It's a little chilly, let's checkout a gastropub.";
                category = "gastropubs";
            }
            else if (temperature < 0) {
                // console.log("Holy shit it's cold!");
                message = "It's freezing out! Time for some comfort food.";
                category = "comfortfood";
            }
            else if (weather === "Snow") {
                // console.log("Brr! It's snowing");
                message = "It's snowing... perfect diner weather";
                category = "Diners";
            }
            else if (weather === "Rain") {
                // console.log("Rain is the worst");
                message = "Blimey it's raining! Better get some fish n chips";
                category = "fishnchips";
            }
            else if (windspeed > 20) {
                // console.log("Woah it's so windy out");
                message = "When the winds blows, so do you on your soup!";
                category = "soup";
            }
            else if (temperature > 85) {
                // console.log("Ugh, it's too hot out, let's find some AC");
                message = "It's hot out here, like spicy hot!";
                category = "tex-mex";
            }
            else {
                // console.log("There is nothing special about the weather today");
                message = "It's a perfect pizza weather day.";
                category = "pizza";
            }

            $("#weather-report").html(message + "<br>We recommend...");
           
            setTimeout(function () { $("#weather-report").append('<br><div id="or-try-again">Or <button type="submit" class="btn btn-primary try-again">Try Again</button></div>'); }, 6000);
                // '<br><div id="or-try-again">Or <button type="submit" class="btn btn-primary try-again">Try Again</button></div>'); }, 6000);
            
            weatherToday = {
                windspeed,
                humidity,
                temperature,
                weather,
                message,
                category
            }
            return weatherToday;
        })
        .catch(function (error) {
            $("#weather-report").html("We've never heard of that city<br><button type='submit' class='btn btn-primary try-again'>Try Again</button>");
        });

}
// YELP!
function yelp(category, cityName) {

    const url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&open_now=true&categories=" + category + "&location=" + cityName;

    const settings = {
        url: url,
        method: "GET",
        headers: {
            "Authorization": "Bearer LdIoBm1aGT5mCUNt8oZHjlmAPaFP3OSz3RW5HEFW5IUcrqttybk1fSx8NQgRIwvg7G8JRyVR9-yRda_5MKXxtGFu9p1QhCMeQxCdxRZt2SqM8CiFJcIdPdUgrcGKXXYx"
        }
    };
    return $.ajax(settings).then(function (response) {
        // console.log(response);

        var randomNum = Math.floor(Math.random() * (response.businesses.length - 0)) + 1;
        // console.log(randomNum);

        var restaurantName = response.businesses[randomNum].name;
        var restaurantLat = response.businesses[randomNum].coordinates.latitude;
        var restaurantLong = response.businesses[randomNum].coordinates.longitude;

        var restaurantImg = response.businesses[randomNum].image_url;
        // console.log(restaurantImg);

        var restaurantAddress = response.businesses[randomNum].location.display_address[0];
        var restaurantUrl = response.businesses[randomNum].url;

        // console.log(restaurantAddress);

        var restName = $("<h5>").text(restaurantName);
        var restAddress = $("<h5>").text(restaurantAddress);
        var websiteLink = $("<a>").attr({
            href: restaurantUrl,
            class: "link"
        }).html(restaurantName);

        var restImg = $("<img>").attr("src", restaurantImg).addClass("yelp-image img-fluid mx-auto d-block rounded");

        //var restLat = $("<p>").text(restaurantLat);
        //var restLong = $("<p>").text(restaurantLong);

        // $('#restaurant-results').append('<h1>Hello</h1>');
        $("#restaurant-results").append(websiteLink, restAddress, restImg);
        setTimeout(function () { $(".card").css("display", "flex"); }, 2000);

        let coordinates = {
            latitude: restaurantLat,
            longitude: restaurantLong
        }

        return coordinates;
    });
}

//EventBrite
function eventBrite(latitude, longitude) {
    var OAuthToken = "X3AL23CV25F7FKYUFWIW";

    var categoryNum1 = 103; // Music 
    var categoryNum2 = 105; // Performing & Visual Arts
    //var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q=&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue&start_date.keyword=today&categories=" + categoryNum1 + "&categories=" + categoryNum2 + "&token=" + OAuthToken;

    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q=&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue&start_date.keyword=today&token=" + OAuthToken;

    // console.log(queryURL);

    return $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);

        var randomNum = Math.floor(Math.random() * (response.events.length - 0)) + 1;
        // console.log(randomNum);

        var eventName = response.events[randomNum].name.text;
        var eventImage = response.events[randomNum].logo.original.url;

        var eventImg = $("<img>").attr("src", eventImage).addClass("event-image d-block mx-auto img-fluid rounded");

        var eventNameTag = $("<h5>").text(eventName);
        var eventUrl = response.events[randomNum].url;
        var eventLink = $("<a>").attr({
            href: eventUrl,
            class: "link"
        }).html(eventNameTag);

        $('#event-results').append(eventLink, eventImg);

    })
}
// Capture Button Click
$("#submit-button").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();
    $("#q-page").css("display", "none");
    $("#eat-page").css("display", "flex");
    // Capture user inputs and store them into variables
    var cityName = $("#city-input").val().trim();

    return weather(cityName)
        .then(function (weatherInfo) {
            // console.log(weatherInfo, "this is the weather object");

            return yelp(weatherInfo.category, cityName)
                .then(function (coordinates) {
                    // console.log(coordinates);
                    return eventBrite(coordinates.latitude, coordinates.longitude)
                    // .then(function(eventInfo) {
                    // console.log(eventInfo);
                    // });
                })

        })
        .catch(function (error) {
            event.preventDefault();
            $("#event-results").append('<button type="submit" id="try-again" class="btn btn-primary try-again">Try Again</button>');
            $('.try-again').on('click', function () {
                document.location.reload();
            });
            
        });


});
$(document).on('click', ".try-again", function () {
    document.location.reload();
});