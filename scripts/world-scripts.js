// Prompts players of specific classes after a long rest that may prepare new spells.
function preparesSpells(actor) {
  const classes = actor.classes;
  if (
    classes.hasOwnProperty('cleric') ||
    classes.hasOwnProperty('druid') ||
    classes.hasOwnProperty('paladin') ||
    classes.hasOwnProperty('ranger') ||
    classes.hasOwnProperty('wizard')
  ) {
    return true;
  } else {
    return false;
  }
}

Hooks.on('dnd5e.restCompleted', (actor, result) => {
  if (result.longRest && preparesSpells(actor) && actor.hasPlayerOwner) {
    new Dialog({
      title: actor.name,
      content:
        'It looks like you have completed a long rest. You may prepare new spells for the adventuring day.',
      buttons: {
        ok: {
          label: 'Open Character Sheet',
          icon: 'fa-solid fa-id-badge',
          callback: () => {
            actor.sheet.render(true);
          },
        },
        close: {
          label: 'Close',
          icon: 'fa-solid fa-xmark',
          callback: () => {},
        },
      },
    });
  }
});
