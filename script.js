// Function to generate a unique user ID
function generateUserId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  // Function to get the current user ID or create a new one
  function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = generateUserId();
      localStorage.setItem('userId', userId);
    }
    return userId;
  }
  
  // Function to add a new iteration
  function addIteration() {
    const userId = getUserId();
    const version = document.getElementById('version').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const majorChanges = document.getElementById('majorChanges').value;
    const specLink = document.getElementById('specLink').value;
    const learning = document.getElementById('learning').value;
  
    const iteration = {
      version: version,
      releaseDate: releaseDate,
      majorChanges: majorChanges,
      specLink: specLink,
      learning: learning,
      comments: [] // Initialize an empty array to store comments
    };
  
    let iterationsData = JSON.parse(localStorage.getItem(userId)) || [];
    iterationsData.push(iteration);
    localStorage.setItem(userId, JSON.stringify(iterationsData));
  
    showIterationList();
    clearFormFields();
  }
  
  // Function to display the iteration list
  function showIterationList() {
    const userId = getUserId();
    const iterationsData = JSON.parse(localStorage.getItem(userId)) || [];
    const iterationListElement = document.getElementById('iterationList');
  
    iterationListElement.innerHTML = '';
    iterationsData.forEach((iteration, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>Version:</strong> ${iteration.version}<br>
                      <strong>Release Date:</strong> ${iteration.releaseDate}<br>
                      <strong>Major Changes:</strong> ${iteration.majorChanges}<br>
                      <strong>Product Spec Document Link:</strong> <a href="${iteration.specLink}" target="_blank">${iteration.specLink}</a><br>
                      <strong>Learning from Customers:</strong> ${iteration.learning}
                      <br>
                      <button onclick="editIteration(${index})">Edit</button>
                      <button onclick="addComment(${index})">Add Comment</button>
                      <div id="comments-${index}" style="display: none;"></div>`;
      iterationListElement.appendChild(li);
    });
  }
  
  // Function to clear form fields after adding an iteration
  function clearFormFields() {
    document.getElementById('version').value = '';
    document.getElementById('releaseDate').value = '';
    document.getElementById('majorChanges').value = '';
    document.getElementById('specLink').value = '';
    document.getElementById('learning').value = '';
  }
  
  // Show the iteration list on page load
  showIterationList();
  
  // Function to edit an iteration
  function editIteration(index) {
    const userId = getUserId();
    let iterationsData = JSON.parse(localStorage.getItem(userId)) || [];
    if (index >= 0 && index < iterationsData.length) {
      const iteration = iterationsData[index];
      document.getElementById('version').value = iteration.version;
      document.getElementById('releaseDate').value = iteration.releaseDate;
      document.getElementById('majorChanges').value = iteration.majorChanges;
      document.getElementById('specLink').value = iteration.specLink;
      document.getElementById('learning').value = iteration.learning;
    }
  }
  
  // Function to filter iterations
  function filterIterations() {
    const filterText = document.getElementById('filterText').value.toLowerCase();
    const userId = getUserId();
    const iterationsData = JSON.parse(localStorage.getItem(userId)) || [];
    const iterationListElement = document.getElementById('iterationList');
  
    iterationListElement.innerHTML = '';
    iterationsData.forEach((iteration, index) => {
      const iterationInfo = `${iteration.version} ${iteration.releaseDate} ${iteration.majorChanges} ${iteration.specLink} ${iteration.learning}`.toLowerCase();
      if (iterationInfo.includes(filterText)) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Version:</strong> ${iteration.version}<br>
                        <strong>Release Date:</strong> ${iteration.releaseDate}<br>
                        <strong>Major Changes:</strong> ${iteration.majorChanges}<br>
                        <strong>Product Spec Document Link:</strong> <a href="${iteration.specLink}" target="_blank">${iteration.specLink}</a><br>
                        <strong>Learning from Customers:</strong> ${iteration.learning}
                        <br>
                        <button onclick="editIteration(${index})">Edit</button>
                        <button onclick="addComment(${index})">Add Comment</button>
                        <div id="comments-${index}" style="display: none;"></div>`;
        iterationListElement.appendChild(li);
      }
    });
  }
  
  // Function to clear the filter and show all iterations
  function clearFilter() {
    document.getElementById('filterText').value = '';
    showIterationList();
  }
  
  // Function to show comments for an iteration
  function showComments(index) {
    const commentsElement = document.getElementById(`comments-${index}`);
    commentsElement.style.display = 'block';
  
    const userId = getUserId();
    let iterationsData = JSON.parse(localStorage.getItem(userId)) || [];
    if (index >= 0 && index < iterationsData.length) {
      const iteration = iterationsData[index];
      commentsElement.innerHTML = `<h3>Comments for Version ${iteration.version}</h3>`;
      if (iteration.comments && iteration.comments.length > 0) {
        iteration.comments.forEach((comment) => {
          commentsElement.innerHTML += `<p>${comment}</p>`;
        });
      } else {
        commentsElement.innerHTML += `<p>No comments yet.</p>`;
      }
    }
  }
  
  // Function to add a comment for an iteration
  function addComment(index) {
    const userId = getUserId();
    let iterationsData = JSON.parse(localStorage.getItem(userId)) || [];
    if (index >= 0 && index < iterationsData.length) {
      const iteration = iterationsData[index];
      const newComment = prompt('Enter your comment:');
      if (newComment) {
        if (!iteration.comments) {
          iteration.comments = [];
        }
        iteration.comments.push(newComment);
        localStorage.setItem(userId, JSON.stringify(iterationsData));
        showComments(index);
      }
    }
  }
  