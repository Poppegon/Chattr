<script>
	import { base } from '$app/paths';

	const speechBubbleImgSrc = "SpeechBubble.png"
</script>

<main class="about-container">
	<section class="about-hero">
		<img src="{base}/{speechBubbleImgSrc}" alt="Chattr Logo" class="about-logo" />
		<h1>Welcome to <span class="highlight">Chattr</span>!</h1>
		<p class="about-lead">
			Chattr is a simple, interactive web forum where you can create posts, comment, and interact with other users through likes and dislikes. The app is designed to be easy to use and lot's of fun.
		</p>
	</section>

	<section class="about-section">
		<h2>✨ Key Features</h2>
		<ul class="about-list">
			<li><strong>Create Posts:</strong> Share your thoughts, ideas, or questions by creating a new post. You can add a title, main content and images to express yourself.</li>
			<li><strong>Comment System:</strong> Engage with other users by leaving comments on posts.</li>
			<li><strong>Likes & Dislikes:</strong> Express your opinion on posts with upvotes (likes) and downvotes (dislikes). The score is shown as the difference between likes and dislikes, and the color changes if a post is more disliked than liked.</li>
			<li><strong>Username Storage:</strong> Enter your username in the navigation bar. Your username is saved in your browser’s local storage and will be used for your posts and comments.</li>
		</ul>
	</section>

	<section class="about-section">
		<h2>💡 Usage Tips</h2>
		<ul class="about-list">
			<li><strong>Navigation:</strong> Use the navigation bar at the top to move between the home page, create a post, view the devblog, or learn more about the app.</li>
			<li><strong>Saving Your Name:</strong> Make sure to enter your username before posting or commenting. This helps others recognize you and keeps your contributions consistent.</li>
			<li><strong>Image Attachments:</strong> When creating a post, you can attach images by providing a valid image URL (ending in .jpg, .jpeg, .png, or .gif).</li>
			<li><strong>Interacting with Posts:</strong> Click the thumbs up or thumbs down buttons to show your thoughts on a post.</li>
		</ul>
	</section>

	<section class="about-section">
		<h2>⚠️ Known Limitations</h2>
		<ul class="about-list">
			<li><strong>No Account System:</strong> Usernames are not tied to accounts, so changing your username or clearing your browser storage will affect your identity.</li>
			<li><strong>Like/Dislike Restrictions:</strong> The app doeas not yet try to prevent multiple likes/dislikes from the same user, but this can be bypassed by changing your username or clearing storage.</li>
			<li><strong>Local Storage:</strong> All your data (username, posts, etc.) is stored locally in your browser. Clearing your browser data will remove your saved information.</li>
			<li><strong>Accessibility:</strong> The app is designed to be usable on all devices. If you encounter layout issues on your device, try resizing your browser or refreshing the page.</li>
		</ul>
	</section>

	<section class="about-footer-message">
		<h2>🎉 Enjoy using Chattr!</h2>
		<p>If you have feedback or find bugs, check the devblog for updates and known issues.</p>
	</section>
</main>


<footer class="about-footer">
   <p>&copy; 2025 Chattr. All rights reserved.</p>
</footer>

<style>
	.about-container {
		max-width: 700px;
		margin: 40px auto 0 auto;
		padding: 2rem 1.5rem 1rem 1.5rem;
		background: linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%);
		border-radius: 24px;
		box-shadow: 0 6px 32px 0 rgba(0,0,0,0.08);
		font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
		color: #222;
		min-height: 80vh;
		overflow-y: auto;
	}

	.about-hero {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.about-logo {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
		margin-bottom: 1rem;
		background: white;
		object-fit: contain;
	}

	.about-hero h1 {
		font-size: 2.5rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
		letter-spacing: 1px;
	}

	.highlight {
		color: #3b82f6;
		background: linear-gradient(90deg, #fbbf24 30%, #3b82f6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.about-lead {
		font-size: 1.15rem;
		color: #444;
		margin-bottom: 0.5rem;
	}

	.about-section {
		margin-bottom: 2rem;
		background: rgba(255,255,255,0.7);
		border-radius: 16px;
		padding: 1.2rem 1rem 1rem 1.5rem;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
	}

	.about-section h2 {
		font-size: 1.3rem;
		color: #2563eb;
		margin-bottom: 0.7rem;
		font-weight: 700;
	}

	.about-list {
		list-style: disc inside;
		margin-left: 0.5rem;
		color: #333;
		font-size: 1.05rem;
		line-height: 1.7;
	}

	.about-list li {
		margin-bottom: 0.5rem;
		padding-left: 0.2rem;
	}

	.about-footer-message {
		text-align: center;
		margin-top: 2.5rem;
		margin-bottom: 1.5rem;
		background: linear-gradient(90deg, #fbbf24 10%, #3b82f6 90%);
		color: #fff;
		border-radius: 16px;
		padding: 1.2rem 1rem 1rem 1rem;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
	}
	.about-footer-message h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}
	.about-footer-message p {
		font-size: 1.1rem;
		margin: 0;
	}

	.about-footer {
		text-align: center;
		padding: 10px;
		background-color: var(--color-gray-200);
		border-top: 2px solid var(--color-gray-300);
		font-size: 0.9rem;
		color: var(--color-gray-700);
		border-radius: 0 0 24px 24px;
		margin-top: 2rem;
	}

	@media (max-width: 600px) {
		.about-container {
			padding: 1rem 0.2rem 0.5rem 0.2rem;
			border-radius: 0;
			margin: 0;
		}
		.about-hero h1 {
			font-size: 1.5rem;
		}
		.about-section {
			padding: 0.7rem 0.3rem 0.7rem 0.7rem;
			border-radius: 10px;
		}
		.about-footer-message {
			border-radius: 10px;
			padding: 0.7rem 0.3rem 0.7rem 0.3rem;
		}
		.about-logo {
			width: 50px;
			height: 50px;
		}
	}

	.about-container {
		/* ...existing styles... */
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}
	.about-container::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera */
	}
</style>