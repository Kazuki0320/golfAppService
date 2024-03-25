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
		<v-container
			v-if="cardList && cardList.length > 0"
			width="400"
		>
			<div
				v-for="(card, index) in cardList"
				:key="`${card}_${index}`"
				class="drop-area"
				@drop="dropList($event, index)"
			>
			<v-row>
				<v-col
					cols="4"
				>
					<v-card 
						draggable="true"
						@dragstart="saveFromIndex($event, index)"
						@dragover.prevent
						@dragenter.prevent
					>
					<v-card-text>
						{{ card.name }}
					</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			</div>
		</v-container>
	</v-main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { moveIndex } from '@/utils/utils';

export default defineComponent({
	data: () => ({
		newName: "",
		cardList: [] as { id: number , name: string } [],
		nextId: 1
	}),
	methods: {
		addCard() {
			this.cardList.push({
				id: this.nextId++,
				name: this.newName
			});
			this.newName = '';
		},
		saveFromIndex(event: DragEvent, dragIndex: number) {
			if(event.dataTransfer) {
				event.dataTransfer.setData('CardListId', dragIndex.toString());
			}
		},
		dropList(event: DragEvent, index: number) {
			if(event.dataTransfer) {
				const dragId = parseInt(event.dataTransfer.getData('CardListId'));
				console.log(event.dataTransfer.getData('CardListId'));

				const arr = [...this.cardList];
				const newArr = moveIndex(arr, dragId, index);
				this.cardList = newArr;
			}
		},
	}
})
</script>
