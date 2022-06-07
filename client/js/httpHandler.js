(function() {
  console.log('page load')

  const serverUrl = 'http://127.0.0.1:3001';



  //TODO: build the swim command fetcher here
  function repeater(){
    console.log("Repeater called")

    setTimeout( ()=>{
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3001/swimmer-says/',
        cache: false,
        contentType: false,
        processData: false,
        success: (data) => {
          console.log("Here is our success!\n",data)
          SwimTeam.move(data.toLowerCase());
          // reload the page
          //we may need to simulate key presses here inside our swim team.
          // window.location = window.location.href;
        },
      });


      repeater()
    },2000)
  }
  repeater();




  /////////////////////////////////////////////////////////////////////
  // The ajax file uploader is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax(
      {
        type: 'POST',
        data: formData,
        url: 'http://localhost:3001/background.jpg',
        cache: false,
        contentType: false,
        processData: false,
        success: () => {
          // reload the page
          window.location = window.location.href;
        }
      }
    );
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    console.log('form submitted')
    ajaxFileUpload(file);
  });

})();