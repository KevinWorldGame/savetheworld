console.log('AR application initialized');

window.addEventListener('load', function () {
  console.log('Window loaded');

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
        console.log('Game piece clicked:', el.id);
        handlePieceClick(el);
      });
    }
  });

  // Function to handle game piece clicks
  function handlePieceClick(el) {
    var pieceId = el.getAttribute('id');
    var pieceData = gameState.pieces[pieceId];

    if (gameState.turn === pieceData.owner) {
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
      console.log("It's not your turn!");
      alert("It's not your turn!");
    }
  }

  // Add event listeners to the marker
  var marker = document.querySelector('#marker');

  if (marker) {
    marker.addEventListener('markerFound', function () {
      console.log('Marker found (markerFound)');
    });

    marker.addEventListener('markerLost', function () {
      console.log('Marker lost (markerLost)');
    });

    // Also listen for targetFound and targetLost events
    marker.addEventListener('targetFound', function () {
      console.log('Marker found (targetFound)');
    });

    marker.addEventListener('targetLost', function () {
      console.log('Marker lost (targetLost)');
    });
  } else {
    console.error('Marker entity not found');
  }

  // Add event listeners to the model
  var boardGameModel = document.querySelector('#board-game');

  if (boardGameModel) {
    boardGameModel.addEventListener('model-loaded', function () {
      console.log('Board game model loaded successfully');
    });

    boardGameModel.addEventListener('model-error', function (error) {
      console.error('Error loading board game model:', error);
    });
  } else {
    console.error('Board game model entity not found');
  }
});
