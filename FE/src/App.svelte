<script>
	import { onMount } from 'svelte';
	let pagination={ count: 0, take: 10, skip: 0}, movies = [];
	let pages = [1], pageInput, perPageInput;
	const perPages = [ 10,20,30,40,50,75,100,150,200];

	const getMovies = async ()=>{
		var url = new URL("http://localhost:3000/movies"),
		params = { "offset": (pagination.skip), "limit": pagination.take}
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
		fetch(url,{
			method:"get"
		}).then(res=>res.json()).then(data=>{
			pagination = data.pagination;
			movies = data.data;
			pages=[];
			for( let i=0; i< Math.ceil(pagination.count/pagination.take); i++)
				pages.push(i+1);
		});
	}
	
	onMount(() => {
		getMovies();
	});
	function paginate(){
		pagination.skip = parseInt(pageInput.value)-1;
		pagination.take = parseInt( perPageInput.value );
		getMovies();
	}


	function paginatePerPage(){
		pagination.skip = 0;
		pagination.take = parseInt( perPageInput.value );
		getMovies();
	}
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
		<div class="p-2 m-2 border border-secondary w-auto row">
			<div class="col form row justify-content-end align-content-center">
				<label for="page" class="w-auto"> Page : </label>
				<select class="form-select w-auto" id="page" on:change={paginate} bind:this={pageInput} aria-label="select example">
					{#each pages as i }
						{#if (pagination.skip+1)==i}
							<option value={i}  selected  >{i}</option>
						{:else}
							<option value={i} >{i}</option>
						{/if}
					{/each }
				</select>
			</div>
			<div class="col form row justify-content-start align-content-center">
				<label for="perpage" class="w-auto"> Items per page : </label>
				<select class="form-select w-auto" id="perpage" on:change={paginatePerPage} bind:this={perPageInput} aria-label="select example">
					{#each perPages as i }
						{#if (pagination.skip+1)==i}
							<option value={i}  selected  >{i}</option>
						{:else}
							<option value={i} >{i}</option>
						{/if}
					{/each }
				</select>
			</div>
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