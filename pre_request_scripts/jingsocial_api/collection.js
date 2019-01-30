//Header not supported yet
//todo

//Set Authorization Environment Value
console.log('Old Authorization:' + pm.globals.get('jingsocial_api_authorization'));
pm.environment.set('authorization', pm.globals.get('jingsocial_api_authorization'));

//Set J-CustomerUUID Environment Value
pm.environment.set('j_customer_uuid', ''); //replace with real value

//Set Admin Username Environment Value
pm.environment.set('admin_username', ''); //replace with real value

//Set Admin Password Environment Value
pm.environment.set('admin_password', ''); //replace with real value

//Post Login
const echoPostRequest = {
  url: 'https://devapi.jingsocial.com/api/user/users/login',
  method: 'POST',
  body: {
    mode: 'urlencoded',
    urlencoded: [
        {key: "username", value: pm.environment.get('admin_username'), disabled: false},
        {key: "password", value: pm.environment.get('admin_password'), disabled: false}
    ]
  }
};
pm.sendRequest(echoPostRequest, function (err, res) {
  if (err) {
      console.log(err);
  } else {
      const jsonData = res.json();
      if (jsonData.code === 0) {
          //Set Authorization Environment Value
          pm.globals.set('jingsocial_api_authorization', jsonData.data.identity.authorization);
          pm.environment.set('authorization', pm.globals.get('jingsocial_api_authorization'));
          console.log('New Authorization:' + pm.globals.get('jingsocial_api_authorization'));
      } else {
          console.log(jsonData.msg);
      }
  }
});
