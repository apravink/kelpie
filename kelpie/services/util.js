// Calculate State
export function calculatePetAnimation(petState) {
    const {mood, temperment} = petState;

    if (mood > 66 && temperment < 50){
        return "angryhappy";
    } else if (mood < 66 && mood >= 50 && temperment < 50) {
        return 'neutral'
    } else if( mood < 50 && temperment < 50) {
        return "sadangry";
    } else if ( mood >= 66 && temperment >= 50) {
        return 'happy'
    } else {
        return 'sad'
    }
}