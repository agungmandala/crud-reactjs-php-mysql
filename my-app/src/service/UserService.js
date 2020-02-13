import axios from 'axios';

export function PostUser(dataUser){
	axios.post("http://localhost/test_api/tambah.php",{ dataUser })
	.then(res => {
		if(res.status === 200){
			window.location.href="/datausers";
		}else{
			console.log("Gagal Input!!");
		}
	})
}
