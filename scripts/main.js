// Initialize game state
var gameState = {
    turn: 'player1',
    pieces: {
      piece1: { position: { x: 0, y: 0.1, z: 0 }, owner: 'player1' },
      // Add additional pieces as needed
    },
    // Additional state variables
  };
  
  // Register a component for game pieces
  AFRAME.registerComponent('game-piece', {
    init: function () {
      var el = this.el;
      el.addEventListener('click', function () {
        handlePieceClick(el);
      });
    }
  });
  
  // Function to handle game piece clicks
  function handlePieceClick(el) {
    var pieceId = el.getAttribute('id');
    var pieceData = gameState.pieces[pieceId];
    
    if (gameState.turn === pieceData.owner) {
      // Allow movement
      console.log('Moving piece:', pieceId);
      
      // Example movement logic
      var currentPosition = el.getAttribute('position');
      el.setAttribute('position', {
        x: currentPosition.x,
        y: currentPosition.y + 0.1,
        z: currentPosition.z
      });
      
      // Update game state
      gameState.pieces[pieceId].position = el.getAttribute('position');
      
      // Switch turn
      gameState.turn = gameState.turn === 'player1' ? 'player2' : 'player1';
      document.getElementById('turn-indicator').innerText = gameState.turn + "'s Turn";
    } else {
      alert("It's not your turn!");
    }
  }
  