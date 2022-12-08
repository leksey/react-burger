import ingredientDetailsStyles from './ingredient-details.module.css';
import { ingredientType } from '../../utils/types';


function IngredientDetails({ details }) {
    return (
            <div className={`${ingredientDetailsStyles.ingridient__details}`}>
                <h2 className={`${ingredientDetailsStyles.ingridient__details__header} text text_type_main-large mt-10 ml-10 mr-10`}>Детали ингредиента</h2>
                <img className={`${ingredientDetailsStyles.ingridient__details__img} text text_type_main-large mb-4`} alt={details.name} src={details.image_large} />
                <h3 className="text text_type_main-medium mb-8">{details.name}</h3>
                <ul className={`${ingredientDetailsStyles.ingridient__details__macro} mb-15`}>
                    <li>
                        <p className="text text_type_main-default">Калории,ккал</p>
                        <p className="text text_type_digits-default">{details.calories}</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default">Белки, г</p>
                        <p className="text text_type_digits-default">{details.proteins}</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default">Жиры, г</p>
                        <p className="text text_type_digits-default">{details.fat}</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default">Углеводы, г</p>
                        <p className="text text_type_digits-default">{details.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        );
}

IngredientDetails.propTypes =  {
    details: ingredientType
};

export default IngredientDetails;
