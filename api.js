let searchinput = document.querySelector('input');
let searchbtn  = document.querySelector('.search-btn');
let profile  = document.querySelector('.profile');
let repopanel = document.getElementById('repositories');
let error  = document.querySelector('.error');  
const forkedpanel = document.querySelector('[data-fork-panel]');
const forkbtn = document.querySelector('[data-forked-tab-btn]');
const followerspanel = document.querySelector('[data-follower-panel]');
const followingpanel = document.querySelector('[data-following-panel]');

searchbtn.addEventListener('click', function(){
  fetchdata(searchinput.value)
})

fetchdata('twitter')

function fetchdata(inputvalue){
  fetch(`https://api.github.com/users/${inputvalue}`)
  .then(response => {
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    updateprofile(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  })
}

function updateprofile(details){

profile.innerHTML = `
     <div class="profile-skeleton">
          <div class="skeleton avatar-skeleton"></div>
          <div class="skeleton title-skeleton"></div>
          <div class="skeleton text-skeleton text-1"></div>
          <div class="skeleton text-skeleton text-2"></div>
          <div class="skeleton text-skeleton text-3"></div>
      </div>
`;

 profile.innerHTML = `
    <figure class="avatar-circle avatar_rounded img-holder" style="--width: 280; --height: 280">
        <img class="img-cover" src="${details.avatar_url}" width="280" height="280" alt="${details.username}">
    </figure>
    <h1 class="title-2">${details.name}</h1>
    <p class="bio">${details.bio}</p>
    <a href="${details.githubPage}" target="_blank" class="btn btn-secondary">
          <span class="material-symbols-rounded" aria-hidden="true">open_in_new</span>
          <span class="span">See on Github</span>
    </a>

    <ul class="profile-meta">

      <li class="meta-item">
           <span class="material-symbols-rounded" aria-hidden="true">Location_on</span>
           <span class="meta-text">${details.location}</span>
      </li>
    
      <li class="meta-item">
          <span class="material-symbols-rounded" aria-hidden="true">apartment</span>
          <span class="meta-text">${details.company}</span>
      </li>

      <li class="meta-item">
             <span class="material-symbols-rounded" aria-hidden="true">captive_portal</span>
             <a href="${details.website}" target="_blank" class="meta-text">${details.website}</a>
      </li>

      <li class="meta-item">
           <span class="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.9441 7.92638C19.9568 8.10403 19.9568 8.28173 19.9568 8.45938C19.9568 13.8781 15.8325 20.1218 8.29441 20.1218C5.97207 20.1218 3.81473 19.4492 2 18.2817C2.32996 18.3198 2.64719 18.3325 2.98984 18.3325C4.90605 18.3325 6.67004 17.6853 8.07867 16.5812C6.27664 16.5431 4.76648 15.3629 4.24617 13.7386C4.5 13.7766 4.75379 13.802 5.02031 13.802C5.38832 13.802 5.75637 13.7512 6.09898 13.6624C4.22082 13.2817 2.81215 11.632 2.81215 9.63958V9.58884C3.35781 9.89341 3.99238 10.0838 4.66492 10.1091C3.56086 9.37306 2.83754 8.11673 2.83754 6.6954C2.83754 5.93399 3.04055 5.23603 3.3959 4.62688C5.41367 7.11419 8.44668 8.73853 11.8477 8.91622C11.7842 8.61165 11.7461 8.29442 11.7461 7.97716C11.7461 5.71825 13.5736 3.87817 15.8451 3.87817C17.0253 3.87817 18.0913 4.3731 18.84 5.17259C19.7664 4.99493 20.6547 4.65228 21.4416 4.18274C21.137 5.13454 20.4898 5.93403 19.6395 6.44161C20.4644 6.35282 21.2639 6.12435 21.9999 5.80712C21.4416 6.61927 20.7436 7.34259 19.9441 7.92638Z" fill="var(--on-background)"></path>              </svg>
           </span>
           <a href="https://twitter.com/${details.twitter_username}" target="_blank" class="meta-text">${details.twitter_username}</span>
        </li>

      </ul>


      <ul class="profile-stats">
            <li class="stats-item">
                <span class="body">${details.public_repos}</span>Repos
            </li>
          <li class="stats-item">
               <span class="body">${details.followers}</span>Followers
            </li>
            <li class="stats-item">
                <span class="body">${details.following}</span>Following
           </li>
        </ul>

        <div class="footer">
            <p class="copyright">&copy; 2024 shravanrawas</p>
        </div>
`;

repopanel.innerHTML = `
<div class="card repo-skeleton">
<div class="card-body">
      <div class="skeleton title-skeleton"></div>
     <div class="skeleton text-skeleton text-1"></div>
     <div class="skeleton text-skeleton text-2"></div>
  </div>

  <div class="card-footer">
     <div class="skeleton text-skeleton"></div>
      <div class="skeleton text-skeleton"></div>
      <div class="skeleton text-skeleton"></div>
  </div>
</div>`.repeat();

updaterepose();
updateforkrepo();
updatefollowers();
updatefollowing();

};

function updaterepose(){
fetch(`https://api.github.com/users/${searchinput.value}/repos`)
  .then(response => response.json())
  .then(repos => {
    repos.forEach(repo => {
      const repocard = document.createElement('article');
      repocard.classList.add('card', 'repo-card')
      repocard.style.marginTop = '10px';
      repocard.innerHTML = `
      <div class="card-body">
           <a href="${repo.html_url}" target="_blank" class="card-title">
                 <h3 class="title-3">${repo.name}</h3>
             </a>
             <p class="card-text">
                 ${repo.description}
             </p>
             <span class="badge">${repo.isPrivate ? "private" : "public"}</span>
         </div>

         <div class="card-footer">
             <div class="meta-item">
                 <span class="material-symbols-rounded" aria-hidden="true">code_blocks</span>
                 <span class="span">${repo.language}</span>
             </div>

             <div class="meta-item">
                 <span class="material-symbols-rounded" aria-hidden="true">star_rate</span>

                 <span class="span">${repo.stars_count}</span>
             </div>

             <div class="meta-item">
                 <span class="material-symbols-rounded" aria-hidden="true">family_history</span>

                 <span class="span">${repo.forks_count}</span>
             </div>
         </div>`;

         repopanel.appendChild(repocard);
    })
  })
  .catch(error => {
    console.error('Error fetching repositories:', error);
});
}

function updateforkrepo(){
  forkedpanel.innerHTML = `<h2 class="sr-only">Forked Repositories</h2>`;
  fetch(`https://api.github.com/users/${searchinput.value}/repos`)
  .then(response => response.json())
  .then(repos => {
    repos.forEach(repo => {
      const forkcard = document.createElement('article');
      forkcard.style.marginTop = '10px';
      forkcard.classList.add('card', 'repo-card')
      forkcard.innerHTML = `
      <div class="card-body">
           <a href="${repo.html_url}" target="_blank" class="card-title">
                 <h3 class="title-3">${repo.name}</h3>
             </a>
             <p class="card-text">
                 ${repo.description}
             </p>
             <span class="badge">${repo.isPrivate ? "private" : "public"}</span>
         </div>

         <div class="card-footer">
             <div class="meta-item">
                 <span class="material-symbols-rounded" aria-hidden="true">code_blocks</span>
                 <span class="span">${repo.language}</span>
             </div>

             <div class="meta-item">
                 <span class="material-symbols-rounded" aria-hidden="true">star_rate</span>

                 <span class="span">${repo.stars_count}</span>
             </div>

             <div class="meta-item">
                 <span class="material-symbols-rounded" aria-hidden="true">family_history</span>

                 <span class="span">${repo.forks_count}</span>
             </div>
         </div>`;
         forkedpanel.appendChild(forkcard);
}

   )}
)}


function updatefollowers(){
  fetch(`https://api.github.com/users/${searchinput.value}/followers`)
  .then(response => {
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(follower => {
      const followercard = document.createElement('article');
      followercard.style.marginTop = '10px';
      followercard.classList.add('card', 'follower-card');
      followercard.innerHTML = `
      <figure class="avatar-circle img-holder">
         <img src="${follower.avatar_url}" width="56" height="56" loading="lazy" alt="${follower.username}" class="img-cover">
      </figure>
      <h3 class="card-title">${follower.login}</h3>
      <button class="icon-btn" aria-label="Go to ${follower.username} profile">
        <span class="material-symbols-rounded" aria-hidden="true">link</span>
      </button> 
      `;
      followerspanel.appendChild(followercard);
    })

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  })
}


function updatefollowing(){
  fetch(`https://api.github.com/users/${searchinput.value}/following`)
  .then(response => response.json())
  .then(following => {
    following.forEach(follower => {
    const followingcard = document.createElement('article')
    followingcard.style.marginTop = '10px'
    followingcard.classList.add('card','follower-card')
    followingcard.innerHTML = `
    <figure class="avatar-circle img-holder">
         <img src="${follower.avatar_url}" width="56" height="56" loading="lazy" alt="${follower.username}" class="img-cover">
      </figure>
      <h3 class="card-title">${follower.login}</h3>
      <button class="icon-btn" onclick="fetchdata(${follower.url})" aria-label="Go to ${follower.username} profile">
        <span class="material-symbols-rounded" aria-hidden="true">link</span>
      </button>`;
      followingpanel.appendChild(followingcard);
    })
  })
  .catch(error => {
    console.error('Error fetching following:', error);
  });

}



    
