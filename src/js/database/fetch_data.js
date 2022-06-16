import axios from "axios";
let employees_db = {
    updateScreen: async function () {
        var url = 'https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee/';
  var data = axios.get(url)
    .then((response) => {
    console.log(response);
    if(response.status == 200){
        return response.data
    }else{
        return 'Error'
    }
    
    })
    //console.log(data)
     return data
      },
      getchekin: async function(id){
        var url = 'https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee/'+id+'/checkin';
        var data = axios.get(url)
    .then((response) => {
    console.log(response);
    if(response.status == 200){
        return response.data
    }else{
        return 'Error'
    }
    
    })
    //console.log(data)
     return data
      }
}
export default employees_db;