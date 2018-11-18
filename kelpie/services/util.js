// Calculate State
export function calculatePetAnimation(petState) {
    const {mood, temperment} = petState;
    

    // if (mood > 66 && temperment < 50){
    //     return "angryhappy";
    // } else if (mood < 66 && mood >= 50 && temperment < 50) {
    //     return 'neutral'
    // } else if( mood < 50 && temperment < 50) {
    //     return "sadangry";
    // } else if ( mood >= 66 && temperment >= 50) {
    //     return 'happy'
    // } else {
    //     return 'sad'
    // }
 // Contingency random assignment
    const rand = Math.floor((Math.random() * 5)+1)
    switch (rand) {
        case(1): return "angryhappy";
        case(2): return "neutral";
        case(3): return "sadangry";
        case(4): return "happy";
        default: return "sad"
    }
}