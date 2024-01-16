export const test = [
  {
    name: 'start',
    type: 'declare',
    data: {
      id: '1',
      x: 40,
      y: 20,
      value: [
        {
          name: 'output',
          type: 'general',
          data: {
            id: '2',
            x: 40,
            y: 80,
            value: {
              name: 'value',
              type: 'expressionValue',
              data: {
                id: '3',
                x: 40,
                y: 80,
                value: 100,
              },
            },
          },
        },
        {
          name: 'output',
          type: 'general',
          data: {
            id: '4',
            x: 20,
            y: 320,
            value: {
              name: 'value',
              type: 'expressionValue',
              data: {
                id: '5',
                x: 20,
                y: 320,
                value: 200,
              },
            },
          },
        },
      ],
    },
  },
  {
    name: 'output',
    type: 'general',
    data: {
      id: '6',
      x: 320,
      y: 20,
      value: {
        name: 'value',
        type: 'expressionValue',
        data: {
          id: '7',
          x: 320,
          y: 20,
          value: 333,
        },
      },
    },
  },
  {
    name: 'value',
    type: 'expressionValue',
    data: {
      id: '8',
      x: 420,
      y: 320,
      value: 486,
    },
  },
  {
    name: 'start',
    type: 'declare',
    data: {
      id: '9',
      x: 620,
      y: 20,
      value: [
        {
          name: 'output',
          type: 'general',
          data: {
            id: '10',
            x: 620,
            y: 80,
            value: {
              name: 'value',
              type: 'expressionValue',
              data: {
                id: '11',
                x: 620,
                y: 80,
                value: 999,
              },
            },
          },
        },
      ],
    },
  },
];
