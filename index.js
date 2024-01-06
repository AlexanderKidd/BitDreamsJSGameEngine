/**
 * The game engine main run loop.
 */
function startEngine(game_tick_ms, gfx_tick_ms, ctx) {
    var updateInterv = setInterval(gameUpdate, game_tick_ms);
    var drawInterv = setInterval(function() {drawUpdate(ctx)}, gfx_tick_ms);
}