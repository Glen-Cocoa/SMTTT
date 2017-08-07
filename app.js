var game_1 = new tic_tac_toe.Game()

$(function(){
	
	$.get('http://ce-sample-api.herokuapp.com/tic_tac_toe_games/2.json',function(res){
		var i = 1
		var savedMoves = res.data.board
		for(var moves = 0; moves < savedMoves.length; moves++){
			
			$("#box-"+i).text(savedMoves[moves])
			i++
		}

	})
	var boardArray = game_1.getBoard()
	var convertedArray = ""
	var gameArray = []
	

	function convertArray(){
		boardArray.reduce(function(prev, curr) {
			return convertedArray = prev.concat(curr);
			});
		console.log(convertedArray)
		}
	

convertArray()
console.log(convertedArray)
/*	
	function convertBack(arr){
		arr = convertedArray
		while(convertedArray.length){ 
				gameArray.push(convertedArray.splice(0,3))
					}
		console.log(gameArray)
	}

convertBack()
*/
	function postGameBoard(){
	var obj = {tic_tac_toe_game:{data: {board: convertedArray }}}
	$.post('http://ce-sample-api.herokuapp.com/tic_tac_toe_games/2.json', obj, function(res){
		console.log(res)
			})
	}


	function makeButtons(){
		var i = 1	
		for(var x = 0; x <=2; x++){
			for(var y = 0; y <=2; y++){
				$("#box-"+i).data("x", x).data("y", y).one("click",function(){
					$(this).text(game_1.player_turn)						
					game_1.place($(this).data('x'), $(this).data('y'))
					convertArray()
					postGameBoard()
					game_1.getWinner()
					if(game_1.winner == true){
						alert("We have a winner")
					}
					
				})
				i++
			}
		}
	}


	makeButtons()

	$("#reset").hide()
	$("table").hide()
	$("#player_1").hide()
	$("#make_player_1").hide()
	$("#player_2").hide()
	$("#make_player_2").hide()
	$("#btn2").click(function(){
		
		$("#btn1").fadeOut()
		$("#btn2").fadeOut()
		$("#player_1").fadeIn()
		$("#make_player_1").fadeIn()
		$("#player_2").fadeIn()
		$("#make_player_2").fadeIn()
		$("#reset").fadeIn()
		$("table").fadeIn()
		if(game_1.winner == true){
				alert("We have a winner.")
		}

	})
	$("#btn1").click(function(){
		game_1.onePlayer()
		$("#btn1").fadeOut()
		$("#btn2").fadeOut()
		$("#reset").fadeIn()
		$("table").fadeIn()

	})
	$('#make_player_1').on('click', function(e) {
		var obj = {tic_tac_toe_game:{player_1: $('#player_1').val() } };
		$.post('http://ce-sample-api.herokuapp.com/tic_tac_toe_games/2.json', obj, function(res) {         
		$("#player_1").hide()
		$("#make_player_1").hide()
		});
	});
	
	$('#make_player_2').on('click', function(e) {
		var obj = {tic_tac_toe_game:{player_2: $('#player_2').val() } };
		$.post('http://ce-sample-api.herokuapp.com/tic_tac_toe_games/2.json', obj, function(res) {
		$("#player_2").hide()
		$("#make_player_2").hide()
		})
	})

	$("#reset").click(function(){
		var obj = {tic_tac_toe_game:{data:{board:[""]}}}
		$.post('http://ce-sample-api.herokuapp.com/tic_tac_toe_games/2.json',obj,function(res){
						})
		location.reload()
	})
})
	
