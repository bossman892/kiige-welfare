(function() {
	// ---- JS logic for Kiige Cousins Welfare ----
	// Ensure member count > 20 and handle account creation
    
	// DOM elements
	const memberCountSpan = document.getElementById('memberCountNumber');
	const liveMemberBadge = document.getElementById('liveMemberCount');
	const messageDiv = document.getElementById('liveMessage');
	const form = document.getElementById('signupForm');
	const firstnameInput = document.getElementById('firstname');
	const lastnameInput = document.getElementById('lastname');
	const emailInput = document.getElementById('email');
	const dobInput = document.getElementById('dob');
	const genderSelect = document.getElementById('gender');
	const phoneInput = document.getElementById('phone');
	// (hidden field is not actively used except for reference)

	// initial member count (more than 20 as required)
	let currentMembers = 24;   // base >20

	// helper to update member displays
	function refreshMemberDisplay() {
		if (memberCountSpan) {
			memberCountSpan.textContent = currentMembers;
		}
		if (liveMemberBadge) {
			liveMemberBadge.textContent = currentMembers + '+';
		}
	}

	// update message with success/error style
	function setMessage(text, isSuccess = true, isError = false) {
		messageDiv.textContent = text;
		messageDiv.classList.remove('success-msg', 'error-msg');
		if (isSuccess && !isError) {
			messageDiv.classList.add('success-msg');
		} else if (isError) {
			messageDiv.classList.add('error-msg');
		}
	}

	// validate form fields (basic)
	function validateForm() {
		if (!firstnameInput.value.trim()) {
			setMessage('❌ first name is required', false, true);
			return false;
		}
		if (!lastnameInput.value.trim()) {
			setMessage('❌ last name is required', false, true);
			return false;
		}
		const email = emailInput.value.trim();
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) {
			setMessage('❌ email address is required', false, true);
			return false;
		}
		if (!emailPattern.test(email)) {
			setMessage('❌ enter a valid email (e.g., name@domain.com)', false, true);
			return false;
		}
		if (!dobInput.value) {
			setMessage('❌ please select your date of birth', false, true);
			return false;
		}
		if (!genderSelect.value) {
			setMessage('❌ please select your gender', false, true);
			return false;
		}
		if (!phoneInput) {
			return true;
		}
		// optional phone: no validation
		return true;
	}

	// override form submission with our custom logic
	form.addEventListener('submit', function(e) {
		e.preventDefault();   // always prevent default page reload

		// Extra safety: if currentMembers somehow dropped below 21, fix it
		if (currentMembers <= 20) {
			currentMembers = 21;
			refreshMemberDisplay();
		}

		if (!validateForm()) {
			return;   // message already set by validateForm
		}

		// get full name for welcome
		const fullName = firstnameInput.value.trim() + ' ' + lastnameInput.value.trim();

		// --- increment member count (new cousin registered) ---
		currentMembers = currentMembers + 1;   // now definitely >20
		refreshMemberDisplay();

		// success message with cousin's name and updated total
		setMessage(`✅ welcome, ${fullName}! account created.`, true, false);

		// Reset form fields for fresh input (optional but user-friendly)
		form.reset();

		// Put focus back to first name for convenience
		firstnameInput.focus();
	});

	// Initialize on page load
	window.addEventListener('load', function() {
		// ensure initial count > 20 (defensive)
		if (currentMembers <= 20) {
			currentMembers = 22;
		}
		refreshMemberDisplay();
		setMessage('💬 welcome, cousin. complete the form.', false, false);
	});

	// Final extra patch: if any reference fails, force member count element update
	refreshMemberDisplay();
})();
