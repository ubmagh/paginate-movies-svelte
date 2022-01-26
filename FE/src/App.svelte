<script>
	import { onMount } from 'svelte';
	let pagination={}, movies = [];

	const getMovies = async ( limit=10, offset=0)=>{
		var url = new URL("http://localhost:3000/movies"),
		params = { limit, offset}
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
		fetch(url,{
			method:"get"
		}).then(res=>res.json()).then(data=>{
			pagination = data.pagination;
			movies = data.data;
		});
	}
	
	onMount(() => {
		getMovies();
	});
</script>

<main>
	<h1 class="h1 text-center mb-3"> Movies </h1>
	<div class="m-2 py-4 px-3 border border-secondary rounded">
		<table class="table stripped text-center m-1">
			<thead>
				<tr> 
					<th class="col-4"> Title </th>	
					<th class="col-4"> Genres </th>	
					<th class="col-4"> Year </th>	
				</tr>
			</thead>
			<tbody>
				{#each movies as movie}
					<tr> 
						<td> {movie.title} </td>
						<td> {movie.genres} </td>
						<td> {movie.year} </td>
					</tr>
				{:else}
					<tr>
						<td colspan="3"> We can't find any movie </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="mt-3 mb-2 w-100">
		<div class="p-2 m-2 border border-secondary">
			
		</div>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>