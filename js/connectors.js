const connections = [
  ['hookshot-cave-entrance', 'hookshot-cave-exit', '#2f4f4f', true],
  ['bumper-cave-entrance', 'bumper-cave-exit', '#7f0000', true],
  ['superbunny-bottom', 'superbunny-top', '#ffb6c1', false],
  ['return-top', 'return-bottom', '#4b0082', true],
  ['old-man-main', 'old-man-back', '#d2b48c', true],
  ['fairy-top', 'fairy-bottom', '#ff8c00', true],
  ['elder-west', 'elder-east', '#00ff00', true],
  ['brothers-west', 'brothers-east', '#0000ff', true],
  ['climb-bottom', 'climb-top', '#ff00ff', false],
  ['spiral-top', 'spiral-bottom', '#ffff54', false],
  ['spec-rock-underpass', 'spec-rock-exit', '#dda0dd', false],
  ['spec-rock-item', 'spec-rock-exit', '#dda0dd', false],
  ['paradox-5items', 'paradox-exit', '#7fffd4', true],
  ['paradox-5items', 'paradox-2items', '#7fffd4', true],
  ['paradox-2items', 'paradox-exit', '#7fffd4', true],
  ['hyrule-main', 'hyrule-east', '#00bfff', true],
  ['hyrule-main', 'hyrule-west', '#00bfff', true],
  ['hyrule-east', 'hyrule-west', '#00bfff', true],
  ['desert-main', 'desert-east', '#ff1493', true],
  ['desert-main', 'desert-west', '#ff1493', true],
  ['desert-east', 'desert-west', '#ff1493', true],
  ['tr-main', 'tr-west', '#ff0000', true],
  ['tr-main', 'tr-back', '#ff0000', true],
  ['tr-west', 'tr-back', '#ff0000', true],
  ['tr-east', 'tr-west', '#ff0000', false],
  ['tr-east', 'tr-main', '#ff0000', false],
  ['tr-east', 'tr-back', '#ff0000', false],
];

class Connectors {
  constructor() {
    this.ctxs = new Map();
    for (const world of ['lw', 'dw']) {
      const canvas = document.getElementById(`${world}-connections`);
      canvas.width = 500;
      canvas.height = 500;

      this.ctxs.set(world, canvas.getContext('2d'));
      this.ctxs.get(world).lineWidth = 5;
    }
  }

  draw() {
    for (const ctx of this.ctxs.values()) {
      ctx.clearRect(0, 0, 500, 500);
    }

    for (const [a, b, color, twoWay] of connections) {
      const locationA = hyruleMap.pois.get(a);
      const locationB = hyruleMap.pois.get(b);

      if (locationA && locationB && !locationA.hidden && !locationB.hidden) {
        const ctxA = this.ctxs.get(locationA.world);
        const ctxB = this.ctxs.get(locationB.world);

        for (const ctx of [ctxA, ctxB]) {
          ctx.beginPath();
          ctx.strokeStyle = color;
          if (twoWay) {
            ctx.setLineDash([]);
          } else {
            ctx.setLineDash([5, 15]);
          }
          ctx.moveTo(locationA.x, locationA.y);
          ctx.lineTo(locationB.x, locationB.y);
          ctx.stroke();
          if (ctxA === ctxB) {
            break;
          }
        }

        if (ctxA !== ctxB) {
          ctxA.beginPath();
          ctxA.strokeStyle = color;
          ctxA.arc(locationB.x, locationB.y, 30, 0, 2 * Math.PI);
          ctxA.stroke();

          ctxB.beginPath();
          ctxB.strokeStyle = color;
          ctxB.arc(locationA.x, locationA.y, 30, 0, 2 * Math.PI);
          ctxB.stroke();
        }
      } else if (locationA || locationB) {
        const location = locationA || locationB;
        const ctx = this.ctxs.get(location.world);

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.setLineDash([15, 15]);
        ctx.arc(location.x, location.y, 30, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }
}

const connectors = new Connectors();
