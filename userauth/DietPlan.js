const mongoose = require('mongoose')
const uri = 'mongodb+srv://majowyporanek:jtpwgdotw0101@nutritionwebsite.6fuodk3.mongodb.net/?retryWrites=true&w=majority'

async function connect() {
    try {
        await mongoose.connect(uri)


        console.log("connected to MongoDB")
    } catch(error){
        console.log(error);
    }
}
mongoose.set('strictQuery', true);
connect()



const mealSchema = new mongoose.Schema({
    name: {type:String, required: true, unique: true},
    description: {type: String},
    ingrediens: [{
        name: {type: String},
        amount: {type: Number},
        unit: {type: String}
    }],
    preparation: {type: String},
    image: {type: String},
})

const Meal = mongoose.model('Meal', mealSchema)


// meals:

const zupaZDyni = new Meal(
    {
        name: "Zupa z dyni",
        description: "Pyszna zupa krem z dyni z dodatkiem mleczka kokosowego i korzeni.",
        ingredients: [
          { name: "dynia", amount: 1, unit: "kg" },
          { name: "cebula", amount: 1, unit: "sztuka" },
          { name: "czosnek", amount: 2, unit: "ząbki" },
          { name: "imbir", amount: 2, unit: "cm" },
          { name: "marchew", amount: 2, unit: "sztuki" },
          { name: "seler naciowy", amount: 1, unit: "sztuka" },
          { name: "bulion warzywny", amount: 1, unit: "litr" },
          { name: "gałka muszkatołowa", amount: 1, unit: "szczypta" },
          { name: "kminek", amount: 1, unit: "łyżeczka" },
          { name: "mleczko kokosowe", amount: 200, unit: "ml" },
          { name: "olej", amount: 2, unit: "łyżki" },
          { name: "sól", amount: 1, unit: "szczypta" },
          { name: "pieprz", amount: 1, unit: "szczypta" },
        ],
        preparation:
          "1. Dynię obierz, usuń pestki i pokrój w kostkę. Cebulę i czosnek posiekaj. Imbir obierz i zetrzyj na tarce. Marchew i seler obierz i pokrój w kostkę.\n2. W dużym garnku rozgrzej olej, dodaj cebulę, czosnek i imbir, a następnie dodaj marchew i seler. Smaż na małym ogniu przez około 5 minut.\n3. Dodaj do garnka dynię, bulion warzywny, gałkę muszkatołową oraz kminek. Gotuj na małym ogniu przez około 30 minut, aż dynia zmięknie.\n4. Zupę zmiksuj blenderem, dodaj mleczko kokosowe i dokładnie wymieszaj. Dopraw solą i pieprzem do smaku.\n5. Podawaj zupę na ciepło z grzankami lub prażonymi pestkami dyni.",
        
      }
)


const pieczonaOwsianka = new Meal({
    name: "Pieczona owsianka",
    description: "Pyszna i pożywna owsianka pieczona w piekarniku",
    ingredients: [
      { name: "płatki owsiane", amount: 1.5, unit: "szklanki" },
      { name: "mleko", amount: 500, unit: "ml" },
      { name: "jajka", amount: 2 },
      { name: "cukier", amount: 2, unit: "łyżki" },
      { name: "cynamon", amount: 1, unit: "łyżeczka" },
      { name: "jabłka", amount: 2 },
      { name: "masło", amount: 2, unit: "łyżki" },
      { name: "rodzynki", amount: 3, unit: "łyżki" },
      { name: "orzechy włoskie", amount: 3, unit: "sztuki" },
    ],
    preparation: `1. Płatki owsiane wsypać do miski, zalać mlekiem i wymieszać. Odstawić na 30 minut.
  2. Jajka ubić z cukrem i cynamonem, dodać do owsianki i dokładnie wymieszać.
  3. Jabłka obrać i pokroić w kostkę, orzechy włoskie posiekać.
  4. Dodać jabłka, rodzynki i połowę orzechów do owsianki i wymieszać.
  5. Masło rozpuścić na patelni, dodać resztę orzechów i zrumienić.
  6. Przełożyć owsiankę do naczynia żaroodpornego posmarowanego masłem, wierzch posypać orzechami i piec około 30-40 minut w temperaturze 180 stopni.`,
    image: "https://images.unsplash.com/photo-1622646547398-5d425b647a53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80",
  });


  const pieczoneFigi = new Meal({
    name: "Sałatka z pieczonymi figami",
    description: "Sałatka z soczystymi figami, kozim serem i orzechami laskowymi.",
    ingredients: [
      { name: "sałata rzymska", amount: 1, unit: "" },
      { name: "kozi ser", amount: 100, unit: "g" },
      { name: "figi", amount: 6, unit: "" },
      { name: "orzechy laskowe", amount: 50, unit: "g" },
      { name: "oliwa z oliwek", amount: 2, unit: "łyżki" },
      { name: "cukier trzcinowy", amount: 1, unit: "łyżka" },
      { name: "ocet balsamiczny", amount: 2, unit: "łyżki" },
    ],
    preparation:
      "Figi przekroić na połówki. Orzechy laskowe posiekać. Sałatę umyć i porwać na kawałki. Koziego sera pokroić w kostkę. Wymieszać wszystkie składniki w misce. Oliwę wymieszać z cukrem i octem balsamicznym. Doprawić do smaku solą i pieprzem. Polać sałatkę sosem.",
    image: "https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/salatka_z_pieczonymi"
});




const salatkaSzparagowa = new Meal({
    name: "Sałatka do grilla ze szparagami, papryką i fetą",
    description: "Sałatka z grillowanymi szparagami, papryką i serem feta, podana na rukoli z octowym dressingiem",
    ingredients: [
      { name: "szparagi", amount: 1, unit: "pęczek" },
      { name: "papryka", amount: 2, unit: "sztuki" },
      { name: "ser feta", amount: 150, unit: "g" },
      { name: "rukola", amount: 50, unit: "g" },
      { name: "oliwa z oliwek", amount: 3, unit: "łyżki" },
      { name: "ocet balsamiczny", amount: 1, unit: "łyżka" },
      { name: "miód", amount: 1, unit: "łyżeczka" },
      { name: "sól", amount: 1, unit: "szczypta" },
      { name: "pieprz", amount: 1, unit: "szczypta" }
    ],
    preparation: "1. Oczyść szparagi i papryki. Pokrój papryki w plastry, a szparagi na mniejsze kawałki.\n2. Rozgrzej grill. Grilluj szparagi i papryki przez kilka minut, aż będą lekko zrumienione.\n3. Pokrój ser feta w kostkę.\n4. Przygotuj dressing: w miseczce wymieszaj oliwę, ocet balsamiczny, miód, sól i pieprz.\n5. Na sporej misce ułóż rukolę, na nią połóż grillowane warzywa i fetę. Polej całość dressingiem. Podawaj od razu."
  });


  const frittata = new Meal({
    name: 'Frittata z pomidorami',
    description: 'Pikantna włoska zapiekanka jajeczna z pomidorami, bazylią i serem pecorino',
    ingredients: [
      { name: 'jajka', amount: 6, unit: 'sztuk' },
      { name: 'pomidory', amount: 3, unit: 'sztuki' },
      { name: 'cebula', amount: 1, unit: 'sztuka' },
      { name: 'czosnek', amount: 2, unit: 'ząbki' },
      { name: 'bazyliowa gałązka', amount: 1, unit: 'sztuka' },
      { name: 'ser pecorino', amount: 50, unit: 'gramów' },
      { name: 'oliwa z oliwek', amount: 2, unit: 'łyżki' },
      { name: 'sól', amount: 0.5, unit: 'łyżeczki' },
      { name: 'pieprz', amount: 0.25, unit: 'łyżeczki' },
    ],
    preparation: 'Pomidory sparzyć i obrać ze skóry. Cebulę i czosnek obrać i drobno pokroić. Bazylię umyć i drobno posiekać.\n\nWymieszać jajka z solą, pieprzem i startym serem pecorino.\n\nNa patelni rozgrzać oliwę z oliwek, dodać cebulę i czosnek i smażyć na złoty kolor. Następnie dodać pomidory i bazylię i dusić przez kilka minut. Wlać jajka z serem, lekko przemieszać, przykryć pokrywką i smażyć na małym ogniu przez około 15 minut.\n\nGdy spód zetnie się, frittatę przekładamy do piekarnika nagrzanego do 200 stopni Celsjusza i pieczemy przez około 5 minut, aż wierzch zetnie się i zrumieni.',
    image: 'https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/frittata_z_pomidorami.jpg'
  });


  const risotto = new Meal({
    name: 'Risotto z groszkiem i jarmużem z rybą gotowaną na parze i pesto',
    description: 'Pyszne i kolorowe danie z ryżu arborio z dodatkiem groszku i jarmużu. Podane z gotowaną na parze rybą i pesto z rukoli. ',
    ingredients: [
      { name: 'cebula', amount: 1, unit: 'sztuka' },
      { name: 'czosnek', amount: 1, unit: 'ząbek' },
      { name: 'jarmuż', amount: 100, unit: 'gram' },
      { name: 'groszek', amount: 200, unit: 'gram' },
      { name: 'ryż arborio', amount: 200, unit: 'gram' },
      { name: 'białe wino', amount: 150, unit: 'mililitr' },
      { name: 'bulion warzywny', amount: 500, unit: 'mililitr' },
      { name: 'filet z dorsza', amount: 2, unit: 'sztuki' },
      { name: 'sól', amount: 1, unit: 'szczypta' },
      { name: 'pieprz', amount: 1, unit: 'szczypta' },
      { name: 'oliwa z oliwek', amount: 2, unit: 'łyżki' },
      { name: 'rukola', amount: 30, unit: 'gram' },
      { name: 'orzeszki piniowe', amount: 20, unit: 'gram' },
      { name: 'parmezan', amount: 20, unit: 'gram' },
    ],
    preparation: 'W garnku rozgrzać oliwę, dodać pokrojoną w kostkę cebulę i zeszklić. Dodać posiekany czosnek i chwilę podsmażyć. Następnie dodać ryż i chwilę podsmażyć, aż stanie się szklisty. Dodać wino i gotować, aż wyparuje. Kolejno dodać bulion partiami, gotując cały czas na małym ogniu, aż ryż będzie miękki. W osobnym garnku zagotować wodę i gotować na parze ryby przez około 5-7 minut. Na patelni rozgrzać oliwę, dodać groszek i jarmuż i podsmażyć przez kilka minut. Doprawić solą i pieprzem. W osobnej miseczce zmiksować rukolę, orzeszki piniowe i parmezan. Podawać risotto z groszkiem i jarmużem, rybą na parze i pesto rukolowym.',
    image: 'https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/risotto_z_groszkiem_i_jarmuzem_z_ryba_gotowana_na_parze_i_pesto.jpg',
  });

  
  const gofryJaglane = new Meal({
    name: "Gofry jaglane",
    description: "Proste, pyszne i zdrowe gofry bez cukru i mąki. Idealne na słodkie śniadanie lub jako deser.",
    ingredients: [
      {
        name: "mleko migdałowe",
        amount: 250,
        unit: "ml"
      },
      {
        name: "jajko",
        amount: 1
      },
      {
        name: "mąka jaglana",
        amount: 50,
        unit: "g"
      },
      {
        name: "proszek do pieczenia",
        amount: 1,
        unit: "łyżeczka"
      },
      {
        name: "ksylitol",
        amount: 2,
        unit: "łyżki"
      },
      {
        name: "olej kokosowy",
        amount: 1,
        unit: "łyżka"
      }
    ],
    preparation: "Wszystkie składniki umieścić w wysokim naczyniu i zmiksować na gładką masę. Masę przelać do gofrownicy i piec ok. 5 minut.",
    image: "https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/gofry_jaglane.jpg"
  });
  
  

 const budynJaglany = new Meal({
    name: "Malinowy budyn jaglany",
    description: "Pyszny i zdrowy budyn na bazie mleka jaglanego z malinami i migdałami",
    ingredients: [
      { name: "mleko jaglane", amount: 500, unit: "ml" },
      { name: "płatki jaglane", amount: 100, unit: "g" },
      { name: "maliny", amount: 200, unit: "g" },
      { name: "migdały", amount: 50, unit: "g" },
      { name: "miód", amount: 2, unit: "łyżki" },
      { name: "cynamon", amount: 1, unit: "łyżeczka" }
    ],
    preparation: "1. Płatki jaglane gotujemy w mleku jaglanym przez około 20 minut.\n2. Następnie dodajemy maliny i gotujemy przez 5 minut.\n3. Migdały siekamy i dodajemy do budyniu razem z miodem i cynamonem.\n4. Gotujemy jeszcze przez 5 minut.\n5. Podajemy na ciepło lub zimno.",
    image: "https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/malinowy_budyn_jaglany_01.jpg"
  })

  const leczo = new Meal({
    name: "Leczo wegetariańskie",
    description: "Pikantne danie warzywne w stylu leczo",
    ingredients: [
      {name: "cebula", amount: 1, unit: "sztuka"},
      {name: "papryka czerwona", amount: 2, unit: "sztuki"},
      {name: "papryka żółta", amount: 2, unit: "sztuki"},
      {name: "bakłażan", amount: 1, unit: "sztuka"},
      {name: "cukinia", amount: 1, unit: "sztuka"},
      {name: "pomidory", amount: 3, unit: "sztuki"},
      {name: "czosnek", amount: 2, unit: "ząbki"},
      {name: "kminek", amount: 1, unit: "łyżeczka"},
      {name: "papryczka chili", amount: 1, unit: "sztuka"},
      {name: "sól", amount: 1, unit: "łyżeczka"},
      {name: "pieprz", amount: 1, unit: "łyżeczka"},
      {name: "olej", amount: 2, unit: "łyżki"}
    ],
    preparation: "1. Cebulę pokroić w kostkę, papryki, bakłażana i cukinię w paski. Pomidory sparzyć, obrać ze skóry i pokroić w kostkę. \n2. Czosnek obrać i drobno posiekać. Papryczkę chili umyć, przekroić na pół, usunąć nasiona i drobno posiekać. \n3. Na patelni rozgrzać olej i dodać cebulę. Smażyć na złoty kolor. \n4. Dodać bakłażana i cukinię, smażyć przez kilka minut, a następnie dodać papryki, pomidory, czosnek, kminek i papryczkę chili. Doprawić solą i pieprzem. \n5. Dusić na małym ogniu około 20 minut, aż warzywa zmiękną. Podawać z chlebem lub ryżem.",
    image: "https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/styles/kotlety_w_papryce_0/public/leczo-wegetarianskie.jpg?itok=iV5Hys-R"
  }
  )
  
  
const meals = [leczo, budynJaglany, gofryJaglane, risotto, frittata, salatkaSzparagowa, pieczoneFigi, pieczonaOwsianka, zupaZDyni]

async function saveMeals(meals) {
    for (const meal of meals) {
      try {
        await meal.save();
        console.log(`Saved ${meal.name} successfully`);
      } catch (error) {
        if (error.message.includes("duplicate key error")) {
          console.log(`Error saving ${meal.name}: Duplicate meal found`);
        } else {
          console.log(`Error saving ${meal.name}: ${error}`);
        }
      }
    }
  }
  
  saveMeals(meals);
  


//end of meals

const mealPlanSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: { type: String },
    meals: [{type: mongoose.Schema.Types.ObjectId, ref: 'Meal'}],
})

const MealPlan = mongoose.model('MealPlan', mealPlanSchema)

module.exports = {Meal, MealPlan}

const mealplan1 = new MealPlan({
    name: 'Jesienny',
    description: 'Z wykorzystaniem składników dostępnych sezonowo jesienią. Dieta zalecana zarówno dla osób odchudzających się, jak i tych, którym zależy na optymalnym utrzymaniu wagi.',
    meals: [pieczonaOwsianka,
            zupaZDyni,
            gofryJaglane]

})


const mealplan2 = new MealPlan({
    name: 'Śródziemnomorski',
    description: 'Z wykorzystaniem składników dostępnych sezonowo jesienią. Dieta zalecana zarówno dla osób odchudzających się, jak i tych, którym zależy na optymalnym utrzymaniu wagi.',
    meals: [frittata,
            risotto, 
            salatkaSzparagowa]

})


const mealPlan3 = new MealPlan({
    name: 'Wegetariański',
    description: 'Z wykorzystaniem składników dostępnych sezonowo jesienią. Dieta zalecana zarówno dla osób odchudzających się, jak i tych, którym zależy na optymalnym utrzymaniu wagi.',
    meals: [budynJaglany,
            leczo, 
            pieczoneFigi]

})



const mealPlans = [mealplan1, mealplan2, mealPlan3]

async function saveMealPlans(mealsPlans) {
    for (const meal of mealsPlans) {
      try {
        await meal.save();
        console.log(`Saved ${meal.name} successfully`);
      } catch (error) {
        if (error.message.includes("duplicate key error")) {
          console.log(`Error saving ${meal.name}: Duplicate meal found`);
        } else {
          console.log(`Error saving ${meal.name}: ${error}`);
        }
      }
    }
  }
  
  saveMealPlans(mealPlans);