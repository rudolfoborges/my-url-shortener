var max = 30,
	min = 0,
	alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

console.log(alphabet.charAt(Math.floor(Math.random() * (max - min + 1)) + min));

