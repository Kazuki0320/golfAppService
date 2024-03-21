<template>
	<v-main>
		<v-container>
			<v-form>
					<v-row>
					<v-col
						cols="12"
						md="4"
					>
						<v-text-field
						v-model="newName"
						:counter="20"
						:rules="nameRules"
						label="名前の追加"
						hide-details
						required
						></v-text-field>
					</v-col>
					</v-row>
			</v-form>
			<v-row>
				<v-col
				cols="12"
				md="4"
				>
					<v-btn
					color="primary"
					class="ma-2"
					type="submit"
					:disabled="invalid"
					@click="addCard"
					>
						追加
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
		<v-container>
			<v-card 
			v-if="cardList && cardList.length > 0"
			width="400">
				<v-row>
					<v-col
					v-for="(card, index) in cardList"
					:key="`${card}_${index}`"
					cols="4"
					>
					<v-card-text>
						{{ card.name }}
					</v-card-text>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</v-main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	data: () => ({
		newName: "",
		cardList: [] as { name: string } []
	}),
	methods: {
		addCard() {
			this.cardList.push({
				name: this.newName
			});
			this.newName = '';
			console.log("cardList", this.cardList);
		}
	}
})
</script>
