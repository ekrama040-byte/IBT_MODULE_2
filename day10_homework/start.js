 async function fetchUsdToEtbRate() {
      try {
        const res = await fetch(
          "https://open.er-api.com/v6/latest/USD"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        return data.rates.ETB;

      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
      }
    }


    // =========================================================
    // 2. Async/Await Example
    // =========================================================

    async function displayData() {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        render(data);

      } catch (error) {
        console.error("Render failed:", error);
      }
    }

    function render(data) {
      console.log("Rendering:", data);
    }


    // =========================================================
    // 3. Network Error vs HTTP 404 Error
    // =========================================================

    async function demonstrateErrors() {

      // -----------------------------------------
      // Case A: Network/DNS error
      // -----------------------------------------

      try {
        await fetch(
          "https://this-domain-does-not-exist-12345.com"
        );

      } catch (error) {
        console.log(
          "Catch block ran! Network failed:",
          error.message
        );
      }


      // -----------------------------------------
      // Case B: HTTP 404
      // -----------------------------------------

      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts/999999"
        );

        console.log(
          `Fetch resolved. status: ${res.status}, ok: ${res.ok}`
        );

        if (!res.ok) {
          throw new Error(
            `Manual trigger for HTTP ${res.status}`
          );
        }

      } catch (error) {
        console.log(
          "Catch block ran via res.ok check:",
          error.message
        );
      }
    }


    // =========================================================
    // 4. Parallel Fetches with Promise.all
    // =========================================================

    async function fetchParallelDetails() {
      try {

        // First get the users
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const users = await res.json();


        // Then fetch two users in parallel
        const [user1, user2] = await Promise.all([

          fetch(
            `https://jsonplaceholder.typicode.com/users/${users[0].id}`
          ).then(async response => {

            if (!response.ok) {
              throw new Error(
                `User 1 request failed: ${response.status}`
              );
            }

            return response.json();
          }),

          fetch(
            `https://jsonplaceholder.typicode.com/users/${users[1].id}`
          ).then(async response => {

            if (!response.ok) {
              throw new Error(
                `User 2 request failed: ${response.status}`
              );
            }

            return response.json();
          })

        ]);

        console.log("Parallel results:", {
          user1,
          user2
        });

      } catch (error) {
        console.error(
          "Parallel fetch failed:",
          error
        );
      }
    }


    // =========================================================
    // 5. Tiny Page State Logic
    // =========================================================

    const app = document.getElementById("app");


    async function loadData() {

      try {

        // Loading state
        app.textContent = "Loading...";


        // Request
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );


        // HTTP error handling
        if (!res.ok) {
          throw new Error(
            `Server returned ${res.status}`
          );
        }


        // Convert response to JSON
        const data = await res.json();


        // Render data
        app.innerHTML = `
          <h1>${data.title}</h1>
          <p>${data.body}</p>
        `;


      } catch (error) {

        // Error state
        app.innerHTML = `
          <span style="color: red;">
            Error: ${error.message}
          </span>
        `;
      }
    }


    // =========================================================
    // 6. Run Everything
    // =========================================================

    async function main() {

      // Load page data
      await loadData();


      // Fetch USD -> ETB
      const rate = await fetchUsdToEtbRate();

      console.log(
        "USD to ETB Rate:",
        rate
      );


      // Display API data
      await displayData();


      // Demonstrate errors
      await demonstrateErrors();


      // Parallel requests
      await fetchParallelDetails();
    }


    // Start application
    main();
