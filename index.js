const searchIcon = document.querySelector('.search-icon'),
    searchForm = document.querySelector('.search-form'),
    searchForm2 = document.querySelector('.search-form-2'),
    repo = document.querySelector('.search-input'),
    repo2 = document.querySelector('.form-input-2'),
    fullName = document.querySelector('.user-full-name'),
    userName = document.querySelector('.username'),
    userBio = document.querySelector('.user-bio'),
    userImage = document.querySelector('.user-image'),
    followers = document.querySelector('.followers'),
    following = document.querySelector('.following'),
    language = document.querySelector('.language'),
    upDate = document.querySelector('.update-date'),
    branch = document.querySelector('.branch'),
    icon = document.querySelector('.circle-icon'),
    mainBody = document.querySelector('.main-body'),
    avatar = document.querySelector('.avatar'),
    divElement = document.querySelector('.parent-div-element'),
    findRepo = document.querySelector('.find-rep'),
    numFilter = document.querySelector('.numfilt'),
    filterP = document.querySelector('.filterP'),
    repoCount = document.querySelector('.repo-count'),
    repos = document.querySelector('.repos');

async function getUser(input) {
    const username = input.value;
    const url = `https://api.github.com/users/${username}`;
    
    const response = await fetch(url);
    const result = await response.json();
    if(result){
        divElement.style.display = "none";
        mainBody.style.display ="block"

        fullName.innerHTML = result.name
        userName.innerHTML = `<a target="_blank" style="text-decoration:none; color:black" href="https://github.com/${result.login}">${result.login}</a>`
        userBio.innerText = result.bio
        userImage.setAttribute('src', result.avatar_url);
        avatar.setAttribute('src', result.avatar_url);
        followers.innerText = result.followers
        following.innerText = result.following

        // const date = result.created_at.DateTimeFormat('en')
        // upDate.innerText = result.date
        // branch.innerText = result.default_branch
        
    } else {
        alert('There is no user with this username')
    }
}

var repoResult;
async function getRepo(input) {
    const username = input.value;
    const url = `https://api.github.com/users/${username}/repos`;
    
    const response = await fetch(url);
    const result = await response.json();
    repoResult = result;
    if(result){
        var num = 20;
        repoCount.innerText = result.length;
        const resultSlice = result.slice(0,num)
        console.log(resultSlice)

        const resMap = resultSlice.map(item => {
            const date = new Date(item.created_at);
            const dateForm = date.toDateString().substring(0,15);
            if(item.language=="JavaScript"){
                icon.style.color = 'yellow'
            } else {

            }
            return `<div>
                    <hr style="width: 97%;"/>
                    <div class="name-star pt-4">
                        <h6><a style="text-decoration:none" href="${item.clone_url}" target="_blank">${item.name}</a></h6>
                        <button onClick="" class="star-btn"><span><i class="far fa-star icon"></i> Star</span></button>
                    </div>
                    <div class="details mb-4">
                        <span><span></span><i style="color:${item.language=='JavaScript'?'#fcba03':item.language=='HTML'?'#ba2f48':item.language=='CSS'?'#0373fc':item.language==null?'#ba2f48':item.language=='PHP'?'#6e66c4':"grey"}" class="fas fa-circle circle-icon"></i> ${item.language?item.language:"HTML"}</span>
                        <span><span></span><i class="far fa-star icon"></i> ${item.stargazers_count}</span>
                        <span><span></span><i class="fas fa-code-branch"></i> ${item.forks}</span>
                        <span>Updated on ${dateForm}</span>
                    </div>
                </div>`
        }).join('');

        repos.innerHTML = resMap;
        
    } else {
        alert('There is no user with this username')
    }
}

searchForm.addEventListener('submit', function(e){
    getRepo(repo);
    getUser(repo);
    e.preventDefault();
})
searchForm2.addEventListener('submit', function(e){
    getRepo(repo2);
    getUser(repo2);
    e.preventDefault();
})

findRepo.addEventListener('keyup', function(e){
    const whatToFind = e.target.value;
    filterRepo(whatToFind)
})


function filterRepo(repo) {
    if(repoResult){
        
        const findThis = repoResult.filter(item => item.name.includes(repo))
        numFilter.innerText = findThis.length;
        filterP.style.display = "block"
        const resMap = findThis.map(item => {
            const date = new Date(item.created_at);
            const dateForm = date.toDateString().substring(0,15);
            return `<div>
                    <hr style="width: 97%;"/>
                    <div class="name-star pt-4">
                        <h6><a style="text-decoration:none" href="${item.clone_url}" target="_blank">${item.name}</a></h6>
                        <button onClick="" class="star-btn"><span><i class="far fa-star icon"></i> Star</span></button>
                    </div>
                    <div class="details mb-4">
                        <span><span></span><i style="color:${item.language=='JavaScript'?'#fcba03':item.language=='HTML'?'#ba2f48':item.language=='CSS'?'#0373fc':item.language==null?'#ba2f48':item.language=='PHP'?'#6e66c4':"grey"}" class="fas fa-circle circle-icon"></i> ${item.language?item.language:"HTML"}</span>
                        <span><span></span><i class="far fa-star icon"></i> ${item.stargazers_count}</span>
                        <span><span></span><i class="fas fa-code-branch"></i> ${item.forks}</span>
                        <span>Updated on ${dateForm}</span>
                    </div>
                </div>`
        }).join('');

        repos.innerHTML = resMap;
        
    } else {
        alert('There is no user with this username')
    }
}