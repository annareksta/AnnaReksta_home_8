function init() {
    const form = document.getElementById('userform');
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        
        const username = document.getElementById("username");
        const resultDiv = document.querySelector(".result");

        if (!username || !resultDiv) {
            console.log("___Error", "Username or result not found");
            return;
        }

        const userValue = username.value.trim();

        resultDiv.innerHTML = "";

        if (userValue === "") {
            resultDiv.innerHTML = `<p class="error">Please enter a username</p>`;
            return;
        }

        const response = await fetch(`https://api.github.com/users/${userValue}`);
        
        console.log("___response", response);

        if (!response.ok) {
            if (response.status === 404) {
                resultDiv.innerHTML = `<p class="error">Пользователь не найден</p>`;
            } else {
                resultDiv.innerHTML = 
                '<p class="error">Произошла ошибка при получении данных.</p>';
            }
            return;
        }


    const data = await response.json();

    resultDiv.innerHTML = `
                 <h2>${data.login}</h2>
                 <img src="${data.avatar_url}" alt="${data.login}" width="100" height="100" style="border-radius: 50%">
                 <p><strong>Количество репозиториев:</strong> ${data.public_repos}</p>
                  <p><strong>Количество подписчиков:</strong> ${data.followers}</p>
                  <p><strong>Количество подписок:</strong> ${data.following}</p>
                  <p><a href="${data.html_url}" target="_blank">Перейти на страницу пользователя</a></p>
`;
console.log("___data", data);
console.log("___submit");
});


}
document.addEventListener('DOMContentLoaded', init);