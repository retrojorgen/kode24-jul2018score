
const getUserScore = (success, fail) => {
fetch('/api/user/score', {
    method: 'get'
 })
 .then(response => {
    if (response.ok) {
        return response.json();
    } else {
        console.log(response);
        throw new Error('401');
    }
  })
.then(response => {
    success(response);
})
.catch(error => fail(error));
}

const getFolderScore = (success, fail) => {
    fetch('/api/folder/score', {
        method: 'get'
     })
     .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
            throw new Error('401');
        }
      })
    .then(response => {
        success(response);
    })
    .catch(error => fail(error));
    }


export { getUserScore, getFolderScore };