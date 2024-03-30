<script lang="ts">
	import { page } from '$app/stores';
	import { socket } from '$lib/services/socket';
	import type {
		EmitRoomJoinAck,
		EmitRoomUpdateAck,
		OnRoomUpdateSync
	} from '$lib/services/socket.types';
	import { socketId } from '$lib/stores';
	import { onMount } from 'svelte';

	let val = '';
	let syncVal = '';
	let ind = { start: 0, end: 0 };
	let timer: any;
	let dataUpdatedFlag = false;
	$: roomId = $page.params.roomId;

	$: console.log({ timer });
	$: console.log({ val });

	onMount(() => {
		if (!roomId) return;
		console.log('roomId', roomId);
		socket.emit('room-join', roomId, (obj: EmitRoomJoinAck) => {
			const { exists, data } = obj;
			if (exists) {
				console.log({ obj });
				console.log('joining old room', roomId);
				if (data) {
					val = data;
					syncVal = data;
				}
			} else console.log('joining existing room', roomId);
		});

		socket.on('room-update-sync', (obj: OnRoomUpdateSync) => {
			console.log('inside update sync');
			const { data } = obj;
			if (data) {
				val = data;
				syncVal = data;
			}
		});
	});

	$: if (!timer && dataUpdatedFlag) {
		dataUpdatedFlag = false;
		timer = setTimeout(() => {
			let startInd = -1,
				endInd = -1;
			for (let i = 0; i < val.length; i++) {
				if (syncVal.charAt(i) !== val.charAt(i)) {
					if (startInd === -1) {
						startInd = i;
					}
					endInd = i;
				}
			}
			console.log({ val, syncVal, endInd, startInd, x: val.substring(startInd, endInd + 1) });

			emitUpdate();
			clearTimeout(timer as any);
			timer = null;
		}, 1000);
	}

	$: if (val) {
		dataUpdatedFlag = true;
	}

	function emitUpdate() {
		// @todo - handle write collisions
		socket.emit(
			'room-update',
			{ snip: val, id: roomId, startInd: ind.start, endInd: ind.end },
			(data: EmitRoomUpdateAck) => {
				ind = { start: 0, end: 0 };
			}
		);
	}
</script>

<div>
	<p>Connected id: {$socketId}</p>
	<p>room id: {roomId}</p>
	<div class="p-2 bg-orange-200 flex w-full">
		<textarea name="data" id="data" bind:value={val} class="w-full h-[200px] p-1" />
	</div>
</div>
