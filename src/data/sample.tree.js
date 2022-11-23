// const sampleTree = {
//     id: "d1bdb16b179594318c0e143c35bdeaae",
//     type: 'Entity',
//     subType: 'Dataset',
//     children: [
//         {
//             id: 'c07b25fa2897cbdc7edec55ad6819782',
//             type: 'Activity',
//             subType: 'Activity',
//             children: [
//                 {
//                     id: '914e77e8b40b452b77d6d8dc12dc1bed',
//                     type: 'Entity',
//                     subType: 'Source'
//                 }
//             ]
//         }
//     ]
// };


const sampleTree = {
    id: "d1bdb16b179594318c0e143c35bdeaae",
    type: 'Entity',
    subType: 'Dataset',
    children: [
        {
            id: 'c07b25fa2897cbdc7edec55ad6819782',
            type: 'Activity',
            subType: 'Activity',
            children: [
                {
                    id: 'c07b25fa2897cbdc7edec55ad6819444',
                    type: 'Entity',
                    subType: 'Sample',
                    text: 'S',
                    properties: {
                      uuid:  'c07b25fa2897cbdc7edec55ad6819444'
                    },
                    children: [
                        {
                            id: 'c07b25fa2897cbdc7edec55ad6817856',
                            type: 'Activity',
                            subType: 'Activity',
                            children: [
                                {
                                    id: 'c07b25fa2897cbdc7edec55ad6819678',
                                    type: 'Entity',
                                    subType: 'Source'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'c07b25fa2897cbdc7edec55ad6819799',
                    type: 'Entity',
                    subType: 'Dataset',
                    children: [
                        {
                            id: '914e77e8b40b452b77d6d8dc12dc1zoo',
                            type: 'Activity',
                            subType: 'Activity',
                            children: [
                                {
                                    id: '914e77e8b40b452b77d6d8dc12dc1med',
                                    type: 'Entity',
                                    subType: 'Sample'
                                },
                                {
                                    id: '914e77e8b40b452b77d6d8dc12dc1wed',
                                    type: 'Entity',
                                    subType: 'Source'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

export default sampleTree