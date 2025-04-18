// public/js/student.js
import { supabase } from './supabase.js';

const grade     = Number(document.body.dataset.grade);
const container = document.getElementById('comprehensions-container');
const logoutBtn = document.getElementById('logout-btn');

const data = {
  3: [
    {
      id: 1,
      passage: `Butterflies start life as tiny eggs laid on a leaf. After a few days
the egg hatches into a caterpillar, which spends most of its time eating
the leaf it was born on. As it grows, the caterpillar sheds its skin
several times, becoming larger each time. When it is ready, it attaches
itself to a branch and forms a chrysalis (also called a pupa). Inside
the chrysalis, the caterpillar’s body changes into a butterfly—a process
scientists call metamorphosis. After about two weeks, the butterfly
breaks free and pumps blood into its wings until they are strong enough
to carry it on the wind. Finally, it flies off in search of nectar and
a mate, completing its transformation from crawling leaf‑eater to
colorful flier.`,
      questions: [
        { q: 'What is the first stage of a butterfly’s life?',             opts: ['Caterpillar','Egg','Chrysalis','Butterfly'], a: 'Egg' },
        { q: 'What does the caterpillar do before forming a chrysalis?',     opts: ['Lays eggs','Hibernates','Eats leaves','Flies'],     a: 'Eats leaves' },
        { q: 'What is another name for a chrysalis?',                      opts: ['Larva','Pupa','Egg','Nymph'],                    a: 'Pupa' },
        { q: 'What triggers the butterfly to emerge?',                     opts: ['Winter coming','Blood pumping','Skin shedding','Leaf falling'], a: 'Blood pumping' }
      ]
    },
    {
      id: 2,
      passage: `Bees are important pollinators for flowers, fruits, and vegetables.
As they fly from blossom to blossom looking for sweet nectar, pollen
grains stick to their fuzzy bodies. When the bee visits the next flower,
some of that pollen rubs off onto its female parts, helping the plant to
make seeds. This process is called pollination. Without bees and other
pollinators, many of our favorite foods—like apples, strawberries,
and almonds—would not grow. Beekeepers often keep hives near farms
specifically to help crops produce a larger, healthier harvest. Beyond
food, pollination also supports wild plants that supply homes and food
for birds and other wildlife.`,
      questions: [
        { q: 'Why do bees visit many flowers?',                             opts: ['To build hives','To gather pollen','To lay eggs','To find water'], a: 'To gather pollen' },
        { q: 'What happens when pollen rubs off onto a flower’s female parts?', opts: ['It grows leaves','It makes seeds','It dies','It changes color'], a: 'It makes seeds' },
        { q: 'Which crop relies on bee pollination?',                     opts: ['Rice','Corn','Strawberries','Wheat'],                  a: 'Strawberries' },
        { q: 'Who keeps hives to help crops?',                             opts: ['Farmers','Gardeners','Beekeepers','Hunters'],           a: 'Beekeepers' }
      ]
    },
    {
      id: 3,
      passage: `Trees change color each autumn because the chlorophyll in their leaves
breaks down. Chlorophyll is the green pigment that plants use to absorb
sunlight for photosynthesis. As daylight hours shorten and temperatures
drop, trees slow their food‐making processes and chlorophyll fades.
This reveals yellow and orange pigments (called carotenoids) that were
always present but hidden by the green. Some trees also produce red
and purple pigments (anthocyanins) late in the season, which show up
when sugar builds up in leaves. Eventually, the tree seals off the
connection between branch and leaf, causing the leaf to fall to the
ground, where it decomposes and returns nutrients to the soil.`,
      questions: [
        { q: 'What pigment makes leaves green?',                         opts: ['Carotenoid','Chlorophyll','Anthocyanin','Xanthophyll'], a: 'Chlorophyll' },
        { q: 'What causes yellow and orange colors to appear?',           opts: ['New chlorophyll','Hidden pigments','Leaf decay','Sunlight'], a: 'Hidden pigments' },
        { q: 'Which pigment can make leaves red or purple?',             opts: ['Chlorophyll','Anthocyanin','Carotene','Melanin'],      a: 'Anthocyanin' },
        { q: 'Why do leaves eventually fall off?',                         opts: ['Frost damage','Sealed connection','Too much rain','Strong wind'], a: 'Sealed connection' }
      ]
    }
  ],
  4: [
    {
      id: 1,
      passage: `The water cycle describes how water moves around our planet.
First, energy from the sun warms water in lakes, oceans, and rivers.
This causes evaporation—water changing from liquid to vapor. Plants
also release water vapor from their leaves in a process called
transpiration. The vapor rises into the atmosphere, where it cools and
condenses into tiny droplets, forming clouds. When droplets combine
and grow heavy enough, they fall back to Earth as precipitation (rain,
snow, sleet, or hail). That water collects in bodies of water or seeps
into the ground, replenishing aquifers—underground wells. From there,
the cycle begins again, distributing fresh water to all ecosystems and
supporting life everywhere.`,
      questions: [
        { q: 'What starts evaporation in the water cycle?',               opts: ['Wind','Sun’s energy','Clouds','Plants'],                 a: 'Sun’s energy' },
        { q: 'What do plants release during transpiration?',              opts: ['Oxygen','Soil','Water vapor','Heat'],                   a: 'Water vapor' },
        { q: 'What occurs when droplets in clouds grow heavy?',           opts: ['Evaporation','Condensation','Precipitation','Runoff'], a: 'Precipitation' },
        { q: 'Where does water go underground?',                          opts: ['Ocean','Aquifers','Clouds','Atmosphere'],               a: 'Aquifers' }
      ]
    },
    {
      id: 2,
      passage: `Electricity powers our homes, schools, and gadgets. It begins at
power plants, where generators convert mechanical energy into
electrical energy. Wires then carry the current over long distances
through transmission lines. When the current enters your home’s wiring,
it flows into outlets and switches, ready to power devices. A simple
circuit is a closed loop: electricity leaves the power source,
travels through a conductor (like copper wire), passes through a load
(device that uses electricity), and returns to the source. Switches
open the loop to stop the flow, while fuses or circuit breakers
protect against too much current by interrupting the circuit if it
gets dangerous. This invisible flow of electrons keeps our world
lit, warm, and connected.`,
      questions: [
        { q: 'Where is electricity first generated?',                    opts: ['Home outlets','Switches','Power plants','Devices'],     a: 'Power plants' },
        { q: 'What carries electricity over long distances?',            opts: ['Batteries','Transmission lines','Switches','Loads'],    a: 'Transmission lines' },
        { q: 'What does a switch do in a circuit?',                     opts: ['Generate power','Open the loop','Protect from overload','Increase voltage'], a: 'Open the loop' },
        { q: 'What protects a circuit from too much current?',           opts: ['Conductors','Fuses','Generators','Loads'],              a: 'Fuses' }
      ]
    },
    {
      id: 3,
      passage: `Volcanoes are openings in Earth’s crust through which molten
rock, ash, and gas escape. Deep beneath the surface, intense heat
melts rock into magma. Because magma is less dense than solid rock,
it rises through cracks and chambers. If pressure builds enough,
magma explodes out as lava, creating an eruption. Ash clouds can
travel high into the sky, affecting air travel and climate. Some
volcanoes erupt gently, with lava flows, while others explode
violent, sending pyroclastic material down the slopes at high
speed. Over time, repeated eruptions build the volcano’s cone
shape. Erosion and seismic activity can reshape these cones,
creating stunning mountain landforms that record Earth’s fiery past.`,
      questions: [
        { q: 'What is molten rock called before it erupts?',            opts: ['Lava','Magma','Ash','Gas'],                           a: 'Magma' },
        { q: 'Why does magma rise toward the surface?',                 opts: ['It is denser','It is cooler','It is less dense','It is solid'], a: 'It is less dense' },
        { q: 'What can volcanic ash affect?',                          opts: ['Air travel','Soil color','Seasons','Wind speed'],      a: 'Air travel' },
        { q: 'What builds the volcano’s cone shape?',                   opts: ['Water','Erosion','Repeated eruptions','Landslides'],   a: 'Repeated eruptions' }
      ]
    }
  ],
  5: [
    {
      id: 1,
      passage: `Our solar system has eight planets orbiting the sun, a giant ball
of hot plasma at its center. Mercury, Venus, Earth, and Mars are
terrestrial planets made of rock and metal. Jupiter, Saturn, Uranus,
and Neptune are gas or ice giants, with thick atmospheres and
possible rocky cores. Asteroids, comets, and dwarf planets like Pluto
also orbit the sun in belts and scattered regions. Gravity from the
sun and the planets keeps everything in motion. Earth’s moon and
more than 200 moons around the other planets circle their hosts,
creating complex dance patterns. Studying these bodies helps us
understand how our planetary neighborhood formed over 4.5 billion
years ago.`,
      questions: [
        { q: 'Which planet is known as a terrestrial planet?',           opts: ['Jupiter','Earth','Saturn','Neptune'],                   a: 'Earth' },
        { q: 'What holds the solar system together?',                   opts: ['Magnetism','Gravity','Light','Wind'],                   a: 'Gravity' },
        { q: 'What is Pluto classified as?',                            opts: ['Gas giant','Dwarf planet','Asteroid','Comet'],         a: 'Dwarf planet' },
        { q: 'How many moons does Earth have?',                         opts: ['One','Two','Eight','Over 200'],                        a: 'One' }
      ]
    },
    {
      id: 2,
      passage: `In every ecosystem, living things form food chains. A food chain
begins with producers—plants that make their own food using
sunlight. Herbivores, or plant‑eaters like rabbits and deer, eat
the producers. Carnivores, like foxes and hawks, then eat those
herbivores. Omnivores, such as bears, eat both plants and animals.
Decomposers, like fungi and bacteria, break down dead organisms,
returning nutrients to the soil for producers to use again. Energy
flows up the chain but is lost as heat at each step, so there are
typically fewer top predators than producers. This balance keeps
ecosystems healthy.`,
      questions: [
        { q: 'What do producers use to make food?',                     opts: ['Soil','Sunlight','Water','Heat'],                       a: 'Sunlight' },
        { q: 'Herbivores eat what?',                                    opts: ['Other animals','Plants','Fungi','Bacteria'],            a: 'Plants' },
        { q: 'What breaks down dead organisms?',                        opts: ['Producers','Herbivores','Carnivores','Decomposers'],    a: 'Decomposers' },
        { q: 'Why are there fewer top predators?',                       opts: ['Less food energy','More heat','Too much water','More producers'], a: 'Less food energy' }
      ]
    },
    {
      id: 3,
      passage: `Matter exists in different states: solid, liquid, and gas. Solids
have a fixed shape and volume, like an ice cube. Liquids take the
shape of their container but keep the same volume, like water in a
glass. Gases spread out to fill any space, like the air we breathe.
When you heat a solid, its particles gain energy and break free of
their fixed positions, melting into a liquid. Heating a liquid makes
it evaporate into a gas. Cooling a gas slows its particles so they
come closer, condensing into a liquid. Further cooling freezes the
liquid into a solid. These changes of state are physical—matter
does not change its chemical composition—only the arrangement
and energy of particles shift.`,
      questions: [
        { q: 'What state of matter has a fixed shape?',                 opts: ['Liquid','Gas','Solid','Plasma'],                        a: 'Solid' },
        { q: 'What happens when a liquid is heated?',                   opts: ['Freezes','Condenses','Evaporates','Sublimates'],        a: 'Evaporates' },
        { q: 'What state are water droplets in the air?',              opts: ['Solid','Liquid','Gas','Plasma'],                       a: 'Liquid' },
        { q: 'Is freezing a chemical change?',                         opts: ['Yes','No'],                                           a: 'No' }
      ]
    }
  ]
};

async function init() {
  // 1) Auth guard
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return window.location.href = 'index.html';

  // 2) Setup logout
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
  });

  // 3) Check grade data exists
  if (!data[grade]) {
    console.error(`No data for grade ${grade}`);
    return;
  }

  // 4) Build each comprehension card
  data[grade].forEach(comp => {
    const card = document.createElement('section');
    card.className = 'comprehension-card';
    card.innerHTML = `
      <h2>Comprehension ${comp.id}</h2>
      <p class="passage">${comp.passage}</p>
      <form data-id="${comp.id}">
        ${comp.questions.map((item,i) => `
          <div class="question-block" data-q="${i+1}">
            <p>${i+1}. ${item.q}</p>
            ${item.opts.map(opt => `
              <label>
                <span class="opt-text">${opt}</span>
                <input type="radio" name="q${i+1}" value="${opt}">
              </label>
            `).join('')}
          </div>
        `).join('')}
        <button type="button" class="submit-btn">Submit</button>
      </form>
      <div class="result"></div>
    `;
    container.append(card);

    const formEl   = card.querySelector('form');
    const resultEl = card.querySelector('.result');

    formEl.querySelector('.submit-btn').addEventListener('click', async () => {
      const formData = new FormData(formEl);
      let correctCount = 0;

      // clear previous highlights
      card.querySelectorAll('label').forEach(label => {
        label.classList.remove('correct-answer','wrong-answer');
      });

      comp.questions.forEach((item, i) => {
        const qNum   = i + 1;
        const chosen = formData.get(`q${qNum}`);
        const inputs = formEl.querySelectorAll(`input[name="q${qNum}"]`);
        inputs.forEach(input => {
          const label = input.parentNode;
          if (input.value === item.a) {
            label.classList.add('correct-answer');
          }
          if (input.checked && input.value !== item.a) {
            label.classList.add('wrong-answer');
          }
        });
        if (chosen === item.a) correctCount++;
      });

      const score = correctCount * 25;
      resultEl.textContent = `You scored ${score}%`;

      // Save to Supabase
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('scores').insert({
        user_id: user.id,
        class:   grade,
        comp:    comp.id,
        score
      });
    });
  });
}

init();
