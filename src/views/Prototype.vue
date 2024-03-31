<template>
	<v-main>
		<v-container fluid>
			<div>
				<v-row>
					<v-col
						cols="12"
						md="4"
					>
						<label for="group">組数: </label> 
						<input 
						id="group"
						type="number"
						name="group"
						v-model.number="group">
					</v-col>
				</v-row>
			</div>
			<div>
				<v-row>
					<v-row>
						<v-col
							cols="12"
							md="4"
						>
							<label for="member">メンバー人数: </label> 
							<input 
							id="member"
							type="number"
							name="member"
							v-model.number="member">
						</v-col>
					</v-row>
				</v-row>
			</div>
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
					@click="makeCard"
					>
						カード作成
					</v-btn>
				</v-col>
			</v-row>
			<v-form>
				<v-card
				v-for="(memberGroup, groupIndex) in cardList"
				:key="groupIndex"
				class="drop-area"
				@drop="dropList($event, index)">
					<v-row class="cards">
						<v-col
						cols="12"
						md="4">
							<v-card
								v-for="(memberCount, memberIndex) in memberGroup"
								:key="memberIndex"
								class="memberCard"
								draggable="true"
								@dragstart="saveFromIndex($event, index)"
								@dragover.prevent>
								<v-text-field
								v-model="newName"
								:counter="20"
								:rules="nameRules"
								label="氏名を入力してください"
								hide-details
								required
								></v-text-field>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-form>
		</v-container>
	</v-main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { moveIndex } from '@/utils/utils';

export default defineComponent({
	data: () => ({
		newName: "",
		cards: "",
		cardList: [] as { id: number, name: string, member: [number, number]} [],
		nextId: 1,
		group: 0,
		member: 0
	}),
	methods: {
		makeCard() {
			const totalMembers = this.member;
			const group1Size = Math.min(2, totalMembers);
			const group2Size = totalMembers - group1Size;

			for (let i = 0; i < this.group; i++) {
				this.cardList.push ({
					id: this.nextId++,
					name: this.newName,
					member: [group1Size, group2Size]
				});
			}
		},
		saveFromIndex(event: DragEvent, dragIndex: number) {
			if(event.dataTransfer) {
				event.dataTransfer.setData('CardListId', dragIndex.toString());
			}
		},
		dropList(event: DragEvent, index: number) {
			if(event.dataTransfer) {
				const dragId = parseInt(event.dataTransfer.getData('CardListId'));

				const arr = [...this.cardList];
				const newArr = moveIndex(arr, dragId, index);
				this.cardList = newArr;
			}
		},
	}
})
</script>

<style scoped>

.cards {
	margin:20px
}

.drop-area {
	margin:20px
}

.memberCard {
	margin:20px
}
</style>