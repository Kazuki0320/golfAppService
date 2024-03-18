<template>
<label for="name">Name (4 to 8 characters):</label>

<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10"/>

	<div class="d-flex align-center flex-column">
		<v-card
		subtitle="This is a subtitle"
		text="This is content"
		title="This is a title"
		width="400"
		></v-card>
		
		<v-card width="400">
		<template v-slot:title>
			This is a title
		</template>
	
		<template v-slot:subtitle>
			This is a subtitle
		</template>
	
		<template v-slot:text>
			This is content
		</template>
		</v-card>
		
		<v-card width="400">
		<v-card-item>
			<v-card-title>This is a title</v-card-title>
	
			<v-card-subtitle>This is a subtitle</v-card-subtitle>
		</v-card-item>
	
		<v-card-text>
			This is content
		</v-card-text>
		</v-card>
	</div>
	</template>