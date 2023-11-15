(function(){
    function Start()
    {
        console.log("App Started");
        let deleteButtons = document.querySelectorAll('.btn-danger');

//For deleting an entry
for (button of deleteButtons)
{
    button.addEventListener('click', (event)=>{
        if(!confirm("Are you sure you want to delete this entry?"))
        {
            event.preventDefault();
            window.location.assign('/tvlist');
        }
    }
    )
}
    }
    window.addEventListener("load", Start);
})();

