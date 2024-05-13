import BuyerEntity from "../../Backend/Entity/BuyerEntity";
import PropertyEntity from "../../Backend/Entity/PropertyEntity";
import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";

class PropertyController {
  constructor() {
    this.buyerEntity = new BuyerEntity();
    this.realEstateAgentEntity = new RealEstateAgentEntity();
    this.propertyEntity = new PropertyEntity();
  }

  async getBoughtProperties(userId) {
    try {
      const boughtPropertyIds = await this.buyerEntity.getBoughtProperties(
        userId
      );

      const boughtProperties = await Promise.all(
        boughtPropertyIds.map(async (propertyId) => {
          const property = await this.propertyEntity.getProperty(propertyId);

          if (property) {
            return property;
          } else {
            console.error("Property does not exist");
            return null;
          }
        })
      );

      const existingBoughtProperties = boughtProperties.filter(
        (property) => property !== null
      );

      return existingBoughtProperties;
    } catch (error) {
      console.error("Error getting bought properties:", error);
      throw error;
    }
  }
  async getListingProperties(userId) {
    try {
      const listedPropertyIds =
        await this.realEstateAgentEntity.getListedProperties(userId);

      const listedProperties = await Promise.all(
        listedPropertyIds.map(async (propertyId) => {
          const property = await this.propertyEntity.getProperty(propertyId);

          if (property) {
            return property;
          } else {
            console.error("Property does not exist");
            return null;
          }
        })
      );

      const existingListedProperties = listedProperties.filter(
        (property) => property !== null
      );

      return existingListedProperties;
    } catch (error) {
      console.error("Error getting listing properties:", error);
      throw error;
    }
  }
}

export default PropertyController;
