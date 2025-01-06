function openpopup() {
    var a = document.querySelector(".popup");
    a.classList.remove("hide");
  }
   
  function hide() {
    var a = document.querySelector(".popup");
    a.classList.add("hide");
  }
   
  const form = document.querySelector(".innerpopup");
  const book = document.getElementById('title');
  const authname = document.getElementById('name');
  const page = document.getElementById('page');
  const check = document.getElementById("check");
  let img = '';

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    validates1();
    validates2();
    validates3();
   
    if (check.value == "on") {
      check.value = 'In';
    } else {
      check.value = 'Out';
    }
   
    const libraryObject = {
      book: book.value,
      authname: authname.value,
      page: page.value,
      image: img, 
      check: check.value
    };
   
    const library = JSON.parse(localStorage.getItem('kkk')) || [];
   
    library.push(libraryObject);
   if(libraryObject.book.length!==0 && libraryObject.authname.length!==0 && libraryObject.page.length!==0){
    localStorage.setItem("kkk", JSON.stringify(library));
   }

    renderLibrary()
    document.getElementById("form").reset();

  });
   
  function renderLibrary() {
    let showdiv = document.getElementById('show');
    
    const library = JSON.parse(localStorage.getItem('kkk')) || [];
   
    let hw = library.map((e, i) => {
      return (`
        <div class="kl" data-index="${i}">
          <img src="${e.image}" alt="Book Image" />
          <h4>Book Name: ${e.book}</h4>
          <h4>Author Name: ${e.authname}</h4>
          <h4>Pages: ${e.page}</h4>
          <h4>Status:<label class="switch switchh" >
          <lable id="in" class="inn">In</lable>
          <input type="checkbox" id="check" >
          <span class="slider round"></span>
          </label>
          <label id="out" class="outt">Out</label>
          </h4>
          <button class="delete-btn" data-index="${i}">Delete</button>
        </div>
      `);
    }).join('');
   
    showdiv.innerHTML = hw;
   
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function() {
        const bookIndex = this.getAttribute('data-index');
        deleteBook(bookIndex);
      });
    });
  }
   
  function deleteBook(index) {
    const library = JSON.parse(localStorage.getItem('kkk')) || [];
    
    library.splice(index, 1);
   
    localStorage.setItem("kkk", JSON.stringify(library));
   
    renderLibrary();
    document.querySelector(".form").reset();

  }
   
  const imageInput = document.getElementById('imageInput');
  imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        img = e.target.result; 
        console.log(img); 
      };
      reader.readAsDataURL(file);
    }
  });
  
  var count=0;

  function validates1() {
    if (book.value.length == 0) {
      document.querySelector('.error1').style.display = 'block';
    } else {
      var letters = /^[A-Za-z .]+$/;
      if (!book.value.match(letters)) {
        document.querySelector(".str1").style.display = "block";
        document.querySelector('.error1').style.display = 'none';
        return false;
      } else {
        document.querySelector(".str1").style.display = "none";
        document.querySelector('.error1').style.display = 'none';
        count=1;
      }
    }
  }
   
  function validates2() {
    if (authname.value.length == 0) {
      document.querySelector('.error2').style.display = 'block';
    } else {
      var letters = /^[A-Za-z .]+$/;
      if (!authname.value.match(letters)) {
        document.querySelector(".str2").style.display = "block";
        document.querySelector('.error2').style.display = 'none';
        return false;
      } else {
        document.querySelector(".str2").style.display = "none";
        document.querySelector('.error2').style.display = 'none';
        count=2;
        console.log(count);
      }
    }
  }
   
  function validates3() {
    if (page.value.length == 0) {
      document.querySelector('.error3').style.display = 'block';
    } else {
      if (isNaN(page.value)) {
        document.querySelector(".str3").style.display = "block";
        document.querySelector('.error3').style.display = 'none';
        return false;
      } else {
        document.querySelector(".str3").style.display = "none";
        document.querySelector('.error3').style.display = 'none';
        count=3;
        console.log(count);
      }
    }
    if(count==3){
      count=0;
        document.querySelector(".submit").addEventListener("click", hide);
    }
    else
        console.log("nope  "+count)
  }
   
renderLibrary()
   
