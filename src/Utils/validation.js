export default class Validation {
	validateEmail(email) {
		const pattern = /^[\w.-]+@[\w.-]+\.\w+$/;
		return pattern.test(email);
	}

	validateUsername(username) {
		const pattern = /^[a-zA-Z0-9_-]{3,20}$/;
		return pattern.test(username);
	}

	validatePassword(password) {
		// Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
		const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		return pattern.test(password);
	}

	validateName(name) {
		const pattern = /^[a-zA-Z\s]+$/;
		return pattern.test(name);
	}

	validateAge(age) {
		age = parseInt(age, 10);
		if (!isNaN(age) && age >= 18) {
			return true;
		} else {
			return false;
		}
	}
}
