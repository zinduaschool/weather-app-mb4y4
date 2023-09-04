const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '20eeea2333msh9e19ee9ffbca7c9p1b45a1jsna5a14cc33d87',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

const fetchData = async ()=>{
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
    
    fetchData()