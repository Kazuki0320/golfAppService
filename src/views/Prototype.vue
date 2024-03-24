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
				class="drop-area"
				@drop="dropList($event)"
				@dragover.prevent
				@dragenter.prevent
			>
			<v-row>
				<v-col>
					<v-card 
					v-for="(card, index) in cardList"
							:key="`${card}_${index}`"
							cols="4"
							draggable="true"
							@dragstart="dragList($event, card.id)"
					>
					<v-card-text>
						{{ card.id }}
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
import { defineComponent } from '@vue/composition-api'

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
		dragList(event, dragId) {
			event.dataTransfer.effectAllowed = 'move'
			event.dataTransfer.dropEffect = 'move'
			event.dataTransfer.setData('CardListId', dragId)
		},
		dropList(event) {
			const dragId = parseInt(event.dataTransfer.getData('CardListId'))
			// const dragList = this.cardList.find(card => card.id === dragId)
			const dragListIndex = this.cardList.findIndex(card => card.id === dragId);
			if (dragListIndex !== -1) {
				// ドロップされた要素のインデックスを取得する
				const dropIndex = dragListIndex - 1;
				// 要素をドロップされた位置に挿入する
				this.cardList.splice(dropIndex, 0, this.cardList.splice(dragListIndex, 1)[0]);
			}
		}
	}
})
</script>
